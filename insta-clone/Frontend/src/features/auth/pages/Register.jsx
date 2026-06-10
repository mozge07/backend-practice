import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const { handleRegister, loading} = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    handleRegister(username, email, password)
    .then(res=>{
      console.log(res);
      navigate("/login")
    })
    
  }

  if(loading){
    return (
      <h1>Loading.....</h1>
    )
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