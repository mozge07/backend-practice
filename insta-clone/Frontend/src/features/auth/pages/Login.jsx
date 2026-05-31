import React from 'react'
import "../style/form.scss"
import { Link } from 'react-router'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <input type="text" name='username' placeholder='Enter your name' />
                <input type="text" name='password' placeholder='Enter your password' />
                <button type='submit'>Login</button>
            </form>

            <p>don't Have an account? <Link className='toggleauthform' to="/Register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login