
const User = require("../models/User")
const generateToken = require("../utils/generateToken")


const registerUser = async (req, res) => {
    console.log("start here =================================");
    
    console.log("Request body:", req.body);
    
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })
    // console.log(`user: ${userExists}`);


    if (userExists) {
        return res.status(204).json({ message: "Email or Password is invalid" })
    }

    try {
        const user = await User.create({ name, email, password })

        if (user) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            });
        }
    } catch (err) {
        console.log(`can not create user: ${err}`);
        res.status(204).json({ message: `Invalid user data` })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        // console.log(user);
        // console.log(await user.matchPassword(password));                

        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            })
        }
        else {
            res.status(204).json({ message: `Invalid email or password` })
        }
    } catch (err) {
        console.log(`can not find user: ${err}`);
        res.status(204).json({ message: `error in login` })
    }
}

const getUsers = async (req, res) => {
    const users = await User.find()
    res.send(users);
}

const deletUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "user deleted successfully" })
    } catch (err) {
        console.log(`error in delet user: ${err}`);
        res.status(204).json({ message: "can not delete user" })
    }
}

// const updatUser = async(req, res)=>{
//     const {id} = req.params;
//     const{email} = req.body;
    
//     try{
//         const user = await User.findOne({email})
//         user.updatUser
//     }catch(err){
//         res.status(204).json({message: "can not updated"})
//     }
// }

module.exports = { registerUser, loginUser, getUsers, deletUser }