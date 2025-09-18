import style from "./Register.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"


function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()


  async function getUser(user) {
    const api_url = import.meta.env.VITE_API_URL;

    try {
      const res = await axios.post(`${api_url}/auth/register`, user);
      const myDataApi = res.data
      // console.log(`success user data:`, myDataApi);

      if (res.status === 200) {
        return res.data;
      } else {
        return 1;
      }
    } catch (err) {
      if (err.response) {
        console.log("error response", err.response.data);
      } else {
        console.log("error", err.message);
      }
      return 0;
    }
  }

  const [userState, setUserState] = useState(false)

  const onSubmit = async (data) => {
    const user = { email: `${data.userEmail}`, password: `${data.userPassword}`, name: `${data.userName}` }
    let existingUser = await getUser(user)

    if (existingUser === 1) {
      setUserState(true)
    } else if (existingUser === 0) {
      console.log("somthing happen");
    }
    else {
      localStorage.setItem("token", existingUser.token);
      localStorage.setItem("email", existingUser.email);
      localStorage.setItem("name", existingUser.name);
      localStorage.setItem("user_id", existingUser._id);
      navigate("/home");
    }
  }


  return (
    <>
      <section className={style.register}>
        <div className="container">
          <div className={style.row}>
            <div className={style.content}>
              <h2>Register</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.email}>
                  {/* <label htmlFor="email">Email</label> */}
                  <input {...register("userName", {
                    required: "you must enter your name!",
                    minLength: {
                      value: 3,
                      message: "minmum length is 3"
                    },
                    onChange: () => setUserState(false)
                  })} type="text" placeholder="user name" />
                  {errors.userName && <p>{errors.userName.message}</p>}
                </div>
                <div className={style.email}>
                  {/* <label htmlFor="email">Email</label> */}
                  <input {...register("userEmail", {
                    required: "you must enter your email!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address!"
                    }, onChange: () => setUserState(false)
                  })} type="email" placeholder="Email" />
                  {errors.userEmail && <p>{errors.userEmail.message}</p>}
                </div>
                <div className={style.password}>
                  {/* <label htmlFor="password">Password</label> */}
                  <input {...register("userPassword", {
                    required: "you must enter your password!",
                    minLength: {
                      value: 6,
                      message: "minimum length of password are 6 digits"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message: "Password must include uppercase, lowercase, and a special character"
                    },
                    onChange: () => setUserState(false)
                  })} type="password" placeholder="Password" />
                  {errors.userPassword && <p>{errors.userPassword.message}</p>}
                </div>
                <button type="submit">Register</button>
                {userState && <p style={{ marginTop: "5px" }}>Email already exists</p>}
              </form>
              <div className={style.regiser}>
                <h3>Already have an account? <Link to={"/login"}>Login</Link></h3>
              </div>
            </div>
            <div className={style.img}>
              <img src="register.jpg" alt="image" />
            </div>
          </div>
        </div>


      </section>
    </>
  )
}

export default Register
