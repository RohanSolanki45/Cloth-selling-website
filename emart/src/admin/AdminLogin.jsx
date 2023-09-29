import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [data, setData] = useState({ email: '', password: '' })
    let navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.email, password: data.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.status) {
            localStorage.setItem('adminToken', json.data)
            navigate('/admin')
            alert(json.message)
        }
        else {
            setData({ email: '', password: '' });
            alert(json.message)
        }

    }

    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="card" style={{ width: '20rem' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center my-3">Login</h5>
                        <form action="">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" value={data.email} name='email' onChange={onchange} placeholder="name@example.com" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" value={data.password} name='password' onChange={onchange} placeholder="password" required />
                            </div>
                            <button type='submit' className='btn btn-primary' onClick={handleLogin}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin