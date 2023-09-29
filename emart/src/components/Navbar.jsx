import React, { useEffect ,useState} from 'react'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
    const state=useSelector((state)=>state.handleCart)
    const [data, setData] = useState(localStorage.getItem('usertoken'));
    const handleLogout = () => {
        localStorage.removeItem('usertoken');
        setData(null); // Update the data state
        alert('Logout successfully');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/">FASHION-FACTORY</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>

                        </ul>
                        <div className="buttons">
                            {data?<>
                                <Link to="/" className='btn btn-outline-dark' onClick={handleLogout}>
                                <i className='fa fa-sign-in me-1'></i>
                                 LogOut
                            </Link>
                            </>:<><Link to="/login" className='btn btn-outline-dark'>
                                <i className='fa fa-sign-in me-1'></i>
                                 Login
                            </Link>
                            {/* <Link to="/register" className='btn btn-outline-dark ms-2'>
                                <i className='fa fa-user-plus '></i>
                                 Register
                            </Link> */}
                            </>}
                            <Link to="/cart" className='btn btn-outline-dark ms-2'>
                                <i className='fa fa-shopping-cart '></i>
                                 Cart ({state.length})
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar