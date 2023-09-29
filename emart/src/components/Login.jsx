import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import Navbar from './Navbar';

function Login() {
    const [data,setdata]=useState([])
    let navigate = useNavigate();
    const handleInput=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch("http://localhost:5000/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify({email:data.email,password:data.password})
            })
            const json=await response.json()
            console.log(json)
            if (json.status){
                localStorage.setItem('usertoken', json.data)
                navigate("/")  
                alert(json.message) 
            }
            else{
                alert(json.message)
            }
            
        } catch (error) {
            console.log(error)
        }
        }
    return (
        <>
        <Navbar/>
        <div className='container py-5 w-25'>
            <form onSubmit={handleSubmit}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" name='email' value={data.email} onChange={handleInput} className="form-control" required/>
                    <label className="form-label" for="form2Example1">Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" name="password" value={data.password} onChange={handleInput} className="form-control" required/>
                    <label className="form-label" for="form2Example2">Password</label>
                </div>

                {/* <!-- 2 column grid layout for inline styling --> */}

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-outline-dark btn-block mb-4">Log in</button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                    <p>Not a member? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login