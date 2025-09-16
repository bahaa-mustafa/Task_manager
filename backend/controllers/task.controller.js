
const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    const { user_id } = req.body;
    try {
        const tasks = await Task.find({ user_id });
        console.log(tasks);
        res.send(tasks)
    } catch (err) {
        res.status(204).json({ message: `Error in getting data ${err}` })
    }
}

const creatTask = async (req, res) => {
    const { user_id, title, description, state } = req.body;
    try {
        await Task.create({ user_id, title, description, state });
        res.status(200).json({ message: "task created!" })
    } catch (err) {
        res.status(204).json({ message: `Error ${err}` })
    }
}

const updateTask = async (req, res) => {
    // const { id } = req.params;
    const { id, user_id, title, description, state } = req.body;

    try {
        const task = await Task.findById(id);
        if (task.user_id == user_id) {
            await task.updateOne({ title, description, state })
            res.status(200).json({ message: "task updated!" })
        } else {
            res.status(204).json({ message: "task can not updated!" })
        }
    } catch (err) {
        res.status(204).json({ message: `error in updateing: ${err}` })
    }
}

const deletTask = async (req, res)=>{
    const { id, user_id } = req.body;

    try {
        const task = await Task.findById(id);
        if (task.user_id == user_id) {
            await task.deleteOne()
            res.status(200).json({ message: "task deleted!" })
        } else {
            res.status(204).json({ message: "task can not deleted!" })
        }
    } catch (err) {
        res.status(204).json({ message: `error in delete task: ${err}` })
    }
}

module.exports = { getAllTasks, creatTask, updateTask, deletTask }