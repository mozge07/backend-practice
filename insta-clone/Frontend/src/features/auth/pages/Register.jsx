import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form>
                <input type="text" name='username' placeholder='Enter your name' />
                <input type="text" name='email' placeholder='Enter your email' />
                <input type="text" name='password' placeholder='Enter your password' />
                <button type='submit'>Login</button>
            </form>

            <p>Already Have an account? <Link className='toggleauthform' to="/Login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register