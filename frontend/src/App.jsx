import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import LoginPage from "./Pages/Login/Login"
import NotFound from "./Pages/NotFound"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Footer from "./Components/Footer/Footer"
import Register from "./Pages/Register/Register"
import About from "./Pages/About/About"
import Account from "./Pages/Account/Account"
// import dotenv from "dotenv"

// dotenv.config();

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/account" element={<Account/>} />      
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
