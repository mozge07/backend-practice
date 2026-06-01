import React, {useState} from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/register", {
      username,
      email,
      password
    },{
      withCredentials: true
    })
    .then(res =>{
      console.log(res.data);
    })
  }



  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                onInput={(e)=>{setusername(e.target.value)}} 
                type="text" 
                name='username' 
                placeholder='Enter your name' />

                <input onInput={(e)=>{setemail(e.target.value)}} 
                type="text" 
                name='email' 
                placeholder='Enter your email' />

                <input onInput={(e)=>{setpassword(e.target.value)}} 
                type="password" 
                name='password' 
                placeholder='Enter your password' />

                <button type='submit'>Login</button>
            </form>

            <p>Already Have an account? <Link className='toggleauthform' to="/Login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register