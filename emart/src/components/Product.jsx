import React, { useEffect, useState ,useContext} from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { NavLink, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { dress } from '../data/dress';
import Navbar from './Navbar';
import productContext from '../context/ProductContext'

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const context = useContext(productContext)
  const {getproduct} = context

  const dispatch = useDispatch();

  const addProduct = (product) => {
    console.log(product)
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await getproduct()
      const singleProduct = data.find((p)=>{
        return p._id === id
      })
      setProduct(singleProduct);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={'400px'} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
      
        <div className="col-md-6">
          <img src={product.imageUrl} alt={product.title} height={'400px'} width={'400px'} />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.brand}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">₹{product.price}</h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(product)}>
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
    <Navbar/>
    
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
    </>
  );
}

export default Product;
