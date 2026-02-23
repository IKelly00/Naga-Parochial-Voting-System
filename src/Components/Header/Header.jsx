import React from 'react'
import "./Header.css";
import Logo from "../../assets/Logo.jpg";


const Header = () => {
  return (
    <>
        <header>
          <div className="img-container">
            <img src={Logo} className="logo" width="50" height="50"></img>
            <p className="school-name">Naga Parochial School</p>
          </div>
          <div className="nav-links">
            <a id='voteNow' href="#">Vote Now</a>
          </div>
        </header>
    </>
  )
}

export default Header