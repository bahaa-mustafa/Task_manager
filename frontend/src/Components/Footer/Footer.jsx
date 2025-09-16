import { Link, NavLink } from "react-router-dom"
import style from "./Footer.module.css"
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

function Footer() {
    return (
        <>
            <footer className={style.footer}>
                <div className="container">
                    <div className={style.row}>
                        <div className={style.info}>
                            <div className={style.our_logo}>
                                <div className={style.logo}>
                                    <img src="logo.png" alt="logo" />
                                </div>
                                <h3>Task Manager</h3>
                            </div>

                            <div className={style.contacts}>
                                <Link to={"mailto:bahaa.myjob@gmail.com"}><Mail /> bahaa.myjob@gmail.com </Link>
                                <Link to={"whatsapp://send?text=Hi bahaa-mustafa!&phone=+201147118632"}><MessageCircle /> whatsapp </Link>
                                <Link to={"tel:+201147118632"}><Phone /> +20 1147118632 </Link>
                                <Link><MapPin /> Egypt </Link>
                            </div>
                            
                        </div>
                        <div className={style.navbar_links}>

                            <div className={style.text}>
                                <h3>About our services:</h3>
                                <p>A streamlined task manager for organizing daily activities, featuring login, registration, and intuitive navigation for efficient productivity.</p>
                            </div>                           

                            <div className={style.actions}>
                                <h3>Links:</h3>
                                <div className={style.links}>
                                    <div className={style.col}>
                                        <NavLink to={"/"}>Home</NavLink>
                                        <NavLink to={"/about"}>About</NavLink>
                                    </div>
                                    <div className={style.col}>
                                        <NavLink to={"/login"}>Login</NavLink>
                                        <NavLink to={"/register"}>Register</NavLink>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
