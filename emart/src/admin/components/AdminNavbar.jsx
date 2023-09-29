import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar() {
    const handleLogout = ()=>{
        localStorage.removeItem('adminToken')
    }
  return (
    <>
     <div className='mb-5'>
            <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/">FASHION-FACTORY</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admin">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/product">Products</Link>
                            </li>
                        </ul>
                        <div className="buttons">
                        <Link to="/" className='btn btn-outline-dark' onClick={handleLogout}>
                                <i className='fa fa-sign-in me-1'></i>
                                 LogOut
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default AdminNavbar