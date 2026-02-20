import React from 'react'
import "./Main.css";
import "./Card.css";
import Header from '../Header/Header.jsx';
import Script from "./Script.jsx";

const Main = () => {
  return (
    <>
        <div className="login-modal" id='login-modal'>
            <div className="main-container">
                <h1 className="login-header">Login</h1>
                <form action="/login" method="POST" id="loginForm">
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required/>
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                    </div>
                    <button type="submit" class="btn">Login</button>
                    <div class="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>
                    </form>
            </div>
        </div>

        <div className="card-container">
            <div className="cards">
                <div className="card">
                    <img src="" alt="" className="candidates" />
                    <p className="name">Michael Roy A. Jardinel</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Main