import React, { useState, useEffect, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom';
import { dress } from '../data/dress';
import Navbar from './Navbar';
import productContext from '../context/ProductContext'

function Products() {
    const context = useContext(productContext)
    const {getproduct} = context
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data.filter((x) => x.category !== 'electronics'))
    const [loading, setLoading] = useState(false)

    let componentMounted = true
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);

            if (componentMounted) {
                const products = await getproduct();
                console.log(products)
                // Filter out the 'electronics' category initially
                const filteredProducts = await getproduct() ;

                setData(products);
                setFilter(filteredProducts);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, [])
    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={'350px'} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={'350px'} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={'350px'} />
                </div>
            </>
        )
    }

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => 
        {
            if (x.category === cat){
                return true
            }
            else{
                return false
            }
        })
        setFilter(updatedList)
    }
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() =>
                        setFilter(data)
                    }>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() =>
                        filterProduct("Men")
                    }>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() =>
                        filterProduct("Women")
                    }>Women's Clothing</button>
                </div>

                {filter.map((product) => {
                    return (
                        <>
                        
                            <div class="card m-2 shadow" style={{width: '16.5rem', border: '1px solid black shadow'}}>
                                
                                <img src={product.imageUrl} class="card-img-top" alt="..." style={{width:'100%', height:'300px'}}/>
                                    <div class="card-body" style={{borderTop : '1px solid black'}}>
                                        <h5 class="card-title">{product.brand}</h5>
                                        <p class="card-text">{product.title}</p>
                                        <h5 class="card-text">Price : ₹{product.price}</h5>

                                        <NavLink to={`/products/${product._id}`} className="btn btn-dark ms-2 px-3 py-2">Go somewhere</NavLink>
                                        
                                    </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    return (
        <>
        <Navbar/>
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center '>Latest Products</h1>
                        <hr />

                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
        </>
    )
}

export default Products