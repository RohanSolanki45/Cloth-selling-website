import React, { useContext, useEffect, useState, useRef } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Adminhero from '../components/Adminhero';
import { Link } from 'react-router-dom';
import productContext from '../../context/ProductContext';
import { AdminProductItem } from './AdminProductItem';

function AdminProduct() {
    const context = useContext(productContext);
    const { getproduct, deleteproduct ,editproduct} = context;
    const [products, setProducts] = useState([]);
    const [deletedProductId, setDeletedProductId] = useState(null); // Track deleted product ID

    const [product, setProduct] = useState({})

    const ref = useRef(null)
    const refclose = useRef(null)

    useEffect(() => {
        const fetchproduct = async () => {
            const data = await getproduct();
            setProducts(data);
        };
        fetchproduct();
    }, [deletedProductId,products]); // Add deletedProductId to the dependency array

    const updateproduct = (currentproduct) => {
        // Add your update logic here
        console.log(currentproduct)
        ref.current.click()
        setProduct({ id: currentproduct._id, etitle: currentproduct.title, ebrand: currentproduct.brand, eprice: currentproduct.price, eimageUrl: currentproduct.imageUrl, equantity: currentproduct.quantity, edescription: currentproduct.description, esize: currentproduct.size, ecategory: currentproduct.category })
    };
    const handleUpdate = ()=>{
        refclose.current.click()
        editproduct(product.id,product.eimageUrl,product.ebrand,product.etitle,product.esize,product.eprice,product.equantity,product.edescription,product.ecategory)
    }
    // new data of product
    const handleInput = ((e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    })

    const deleteproducts = (product) => {
        deleteproduct(product._id);
        setDeletedProductId(product._id); // Set the deleted product ID
        alert('Product deleted successfully');
    };
    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Produ</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="text" value={product.etitle} className="form-control" name='etitle' onChange={handleInput} required />
                                    <label className="form-label">Title</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" value={product.ebrand} className="form-control" name='ebrand' onChange={handleInput} required />
                                    <label className="form-label">Brand</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" value={product.eprice} name='eprice' onChange={handleInput} className="form-control" required />
                                    <label className="form-label">Price</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" value={product.eimageUrl} name='eimageUrl' onChange={handleInput} className="form-control" required />
                                    <label className="form-label">Image Url</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="number" value={product.equantity} name='equantity' onChange={handleInput} className="form-control" required />
                                    <label className="form-label">Quantity</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" value={product.edescription} name='edescription' onChange={handleInput} className="form-control" required />
                                    <label className="form-label">Description</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <select name="esize" id="" onChange={handleInput} value={product.esize}>
                                        <option hidden>select size</option>
                                        <option value="S" >S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>
                                <div className="form-outline mb-4">
                                    <select name="ecategory" id="" onChange={handleInput} value={product.ecategory}>
                                        <option hidden>select category</option>
                                        <option value="Men" >Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Children">Children</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" ref={refclose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleUpdate} class="btn btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>
            <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <AdminNavbar />
            <Adminhero pageName={'Product List'} />
            <div className="container">
                <div className="d-flex flex-row-reverse">
                    <Link to="/admin/addproduct">
                        <button className="btn btn-outline-dark mb-3">Add Product</button>
                    </Link>
                </div>
                <table className="table table-bordered">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">ID</strong>
                            </th>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">Image</strong>
                            </th>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">Name</strong>
                            </th>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">Quantity</strong>
                            </th>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">Price</strong>
                            </th>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">Action</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product, index) => {
                                return (
                                    <AdminProductItem
                                        key={product._id}
                                        index={index}
                                        product={product}
                                        updateproduct={updateproduct}
                                        deleteproduct={deleteproducts}
                                    />
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminProduct;
