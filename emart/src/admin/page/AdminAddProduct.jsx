import React, { useContext,useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Adminhero from '../components/Adminhero'
import productContext from '../../context/ProductContext'

function AdminAddProduct() {
    const context = useContext(productContext)
    const { addproduct } = context
    const [product, setProduct] = useState({ title: '', brand: '', price: '', imageUrl: '', quantity: '', descprition: '', size: '', category: '' })
    const handleSubmit = (e) => {
        e.preventDefault()
        addproduct(product.imageUrl, product.brand, product.title, product.size, product.price, product.description, product.quantity, product.category)
    }
    const handleInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AdminNavbar />
            <Adminhero pageName={"Add Product"} />
            <div className='container py-5 w-25'>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input type="text" value={product.fname} className="form-control" name='title' onChange={handleInput} required />
                        <label className="form-label">Title</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" value={product.fname} className="form-control" name='brand' onChange={handleInput} required />
                        <label className="form-label">Brand</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" value={product.lname} name='price' onChange={handleInput} className="form-control" required />
                        <label className="form-label">Price</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" value={product.lname} name='imageUrl' onChange={handleInput} className="form-control" required />
                        <label className="form-label">Image Url</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="number" value={product.lname} name='quantity' onChange={handleInput} className="form-control" required />
                        <label className="form-label">Quantity</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" value={product.lname} name='description' onChange={handleInput} className="form-control" required />
                        <label className="form-label">Description</label>
                    </div>
                    <div className="form-outline mb-4">
                        <select name="size" id="" onChange={handleInput} value={product.size}>
                            <option hidden>select size</option>
                            <option value="S" >S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                        <select name="category" id="" onChange={handleInput} value={product.category}>
                        <option hidden>select category</option>
                            <option value="Men" >Men</option>
                            <option value="Women">Women</option>
                            <option value="Children">Children</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-outline-dark btn-block mb-4">Add Product</button>
                </form>
            </div>
        </>
    )
} 

export default AdminAddProduct