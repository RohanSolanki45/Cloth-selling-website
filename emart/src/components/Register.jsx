// import React from 'react'
// import { Link } from 'react-router-dom'

// export const Register = () => {
//     return (
//         <div className='container py-5 w-25'>
//             <form >
//                 <div className="d-flex gap-2">
//                     <div className="form-outline mb-4">
//                         <input type="text" id="form2Example1" className="form-control" required/>
//                         <label className="form-label" for="form2Example1">First Name</label>
//                     </div>
//                     <div className="form-outline mb-4">
//                         <input type="text" id="form2Example1" className="form-control" required/>
//                         <label className="form-label" for="form2Example1">Last Name</label>
//                     </div>
//                 </div>
//                 {/* <!-- Email input --> */}
//                 <div className="form-outline mb-4">
//                     <input type="email" id="form2Example1" className="form-control" required/>
//                     <label className="form-label" for="form2Example1">Email address</label>
//                 </div>

//                 {/* <!-- Password input --> */}
//                 <div className="form-outline mb-4">
//                     <input type="password" id="form2Example2" className="form-control" required/>
//                     <label className="form-label" for="form2Example2">Password</label>
//                 </div>

//                 {/* <!-- 2 column grid layout for inline styling --> */}

//                 {/* <!-- Submit button --> */}
//                 <button type="button" className="btn btn-outline-dark btn-block mb-4">Sign in</button>

//                 {/* <!-- Register buttons --> */}
//                 <div className="text-center">
//                     <p>Already a member? <Link to="/login">Register</Link></p>
//                 </div>
//             </form>
//         </div>
//     )
// }


import axios from 'axios'
import React, { useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'



export const Register = () => {
    const [data,setData]=useState([])
    let navigate = useNavigate()
    const handleInput=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response=await fetch("http://localhost:5000/user/createuser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({fname:data.fname,lname:data.lname,email:data.email,password:data.password})
            })
            const json=await response.json()
            console.log(json)
            if (json.status){
                localStorage.setItem('usertoken', json.data)
                navigate("/login")  
                alert(json.message) 
            }
            else{
                alert(json.message)
            }
        }
        catch{
            alert('Something Went Wrong')
        }
    }
    return (
        <>
        <Navbar/>
        <div className='container py-5 w-25'>
            <form onSubmit={handleSubmit}>
                <div className="d-flex gap-2">
                    <div className="form-outline mb-4">
                        <input type="text" value={data.fname} className="form-control" name='fname' onChange={handleInput} required/>
                        <label className="form-label">First Name</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text"  value={data.lname}name='lname' onChange={handleInput} className="form-control" required/>
                        <label className="form-label">Last Name</label>
                    </div>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <input type="email"  value={data.email} name='email' onChange={handleInput} className="form-control" required/>
                    <label className="form-label" >Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <input type="password"  name='password' value={data.password} onChange={handleInput} className="form-control" required/>
                    <label className="form-label" >Password</label>
                </div>

                {/* <!-- 2 column grid layout for inline styling --> */}

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-outline-dark btn-block mb-4">Register</button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                    <p>Already a member? <Link to="/login">Register</Link></p>
                </div>
            </form>
        </div>
        </>
    )
}
