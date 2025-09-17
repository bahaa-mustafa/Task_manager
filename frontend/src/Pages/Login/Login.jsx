import { Link, useNavigate } from "react-router-dom"
import style from "./Login.module.css"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"


function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const [userState, setUserState] = useState(false)

  async function getUser(user) {
    const api_url = import.meta.env.VITE_API_URL;

    try {
      const res = await axios.post(`${api_url}/auth/login`, user);
      const myData = res.data;
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (err) {
      if (err.response) {
        console.log("error response", err.response.data);
      } else {
        console.log("error", err.message);
      }
    }
  }

  const onSubmit = async (data) => {
    const user = { email: `${data.userEmail}`, password: `${data.userPassword}` }
    let existingUser = await getUser(user)
   
    if (existingUser == null) {
      console.log("you don't have an acount");
      setUserState(true);
    } else {
      console.log("Login successful!");
      localStorage.setItem("token", existingUser.token)
      navigate("/home");
    }
  }


  return (
    <>
      <section className={style.login}>
        <div className="container">
          <div className={style.row}>
            <div className={style.content}>
              <h2>Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.email}>
                  {/* <label htmlFor="email">Email</label> */}
                  <input {...register("userEmail", {
                    required: "you must enter your email!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address!"
                    },
                    onChange: () => { setUserState(false) }
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
                <button type="submit">Login</button>
                {userState && <p style={{ margin: "5px" }}>You don't have an account go to Regiser</p>}
              </form>
              <div className={style.regiser}>
                <h3>Don't have an account? <Link to={"/register"}>Register now</Link></h3>
              </div>
            </div>
            <div className={style.img}>
              <img src="login1.jpg" alt="image" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage
