import { NavLink } from "react-router-dom"
import style from "./Navbar.module.css"
import { User } from 'lucide-react';

function Navbar() {
  return (
    <header className={style.navbar}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.logo}>
            <img src="logo.png" alt="logo" />
          </div>
          <nav className={style.navbar_links}>
            <NavLink className={({isActive})=>(isActive? style.active: "")} to={"/"}>Home</NavLink>
            <NavLink className={({isActive})=>(isActive? style.active: "")} to={"/about"}>About</NavLink>
            <NavLink className={({isActive})=>(isActive? style.active: style.user)} to={"/account"}><span><User/></span>Account</NavLink>
            {/* <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/register"}>Register</NavLink> */}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
