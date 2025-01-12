import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData, setFormDate] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormDate({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Login Function Excuted",formData);
    let responseData;
    //http://localhost:4000/login
    await fetch('https://dailysweets-58cb7c07014c.herokuapp.com/login',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }

  const signup = async ()=>{
    console.log("Signup Function Excuted",formData);
    let responseData;
    //http://localhost:4000/signup
    await fetch('https://dailysweets-58cb7c07014c.herokuapp.com/signup',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" name="username" placeholder='Your Name' onChange={changeHandler} value={formData.username}/>:<></>}
          <input type="email" name="email" placeholder='Email Address' onChange={changeHandler} value={formData.email}/>
          <input type="password" name="password" placeholder='Password' onChange={changeHandler} value={formData.password}/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className="loginsignup-agree">
        <input type="checkbox" name='' id='' />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
