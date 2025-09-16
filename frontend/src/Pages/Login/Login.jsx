import { Link, useNavigate } from "react-router-dom"
import style from "./Login.module.css"
import { useForm } from "react-hook-form"

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()


  const validUser = [{
    email: "admin@bahaa-mustafa.com",
    password: "Admin@bahaa123"
  }]

  function setToLocalStorge() {
    localStorage.setItem("user", JSON.stringify({
      name: "Bahaa",
      email: "admin@bahaa-mustafa.com",
      avatar: "https://i.pravatar.cc/0"
    }));
  }



  const onSubmit = (data) => {
    console.log(data);
    console.log(`user email: ${data.userEmail} and password: ${data.userPassword}`);


    let existingUser = validUser.find((user) => user.email === data.userEmail)

    if (existingUser) {
      console.log("Login successful!");
      setToLocalStorge()
      navigate("/home");
    } else {
      console.log("you don't have an acount");
      navigate("/register");
      console.log(validUser);

    }



    // if(data.userEmail === validUser.email && data.userPassword === validUser.password){
    //   console.log("Login successful!");
    //   navigate("/home")      
    // }else{
    //   alert("Invalid email or password");      
    // }
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
                    }
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
                    }
                  })} type="password" placeholder="Password" />
                  {errors.userPassword && <p>{errors.userPassword.message}</p>}
                </div>
                <button type="submit">Login</button>
                {/* <Link to={"/home"}><button type="submit">Login</button></Link> */}
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
