import React from 'react'
import "./Main.css";

const Main = () => {
  return (
    <>
        <div className="login-modal">
            <div className="main-container">
                <h1 className="login-header">login</h1>
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
    </>
  )
}

export default Main