import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, delCart } from '../redux/action';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

function Cart() {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const increaseQuantity = (product) => {
    dispatch(addCart(product));
  };

  const decreaseQuantity = (product) => {
    if (product.quantity === 1) {
      dispatch(delCart(product));
    } else {
      dispatch(delCart(product));
    }
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.qty ,0);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0);

  return (
    <>
    <Navbar/>
  <div className='conatiner-fluid'>
    <h2 className="text-center mt-3">Your Cart</h2>
    <hr />
    <div className="container py-5 d-flex gap-5">


      <div className="cart-items flex-grow-1">
        <div className="table-responsive mb-4">
          <table className="table table-bordered">
            <thead className="bg-light">
              <tr>
                <th className="border-0" scope="col">
                  <strong className="text-small text-uppercase">Product</strong>
                </th>
                <th className="border-0" scope="col">
                  <strong className="text-small text-uppercase">Price</strong>
                </th>
                <th className="border-0" scope="col">
                  <strong className="text-small text-uppercase">Quantity</strong>
                </th>
                <th className="border-0" scope="col">
                  <strong className="text-small text-uppercase">Total</strong>
                </th>
                <th className="border-0" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="pl-0 border-0" scope="row">
                    <NavLink to={`/products/${item._id}`} className="btn ms-2 px-3 py-2">
                      <div className="media align-items-center">
                        <img src={item.imageUrl} alt={item.title} width="70" />
                        <div className="media-body ml-3">
                          <strong className="h6">
                            {item.title}
                          </strong>
                        </div>
                      </div>
                    </NavLink>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">${item.price}</p>
                  </td>
                  <td className="align-middle border-0">
                    <div className="input-group input-group-sm">
                      <button
                        onClick={() => decreaseQuantity(item)}
                        className="btn btn-outline-dark"
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="form-control form-control-sm text-center"
                        type="text"
                        value={item.qty}
                        readOnly
                      />
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="btn btn-outline-dark"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">${item.qty * item.price}</p>
                  </td>
                  <td className="align-middle border-0">
                    <a href="{/* Your remove from cart URL here */}" className="reset-anchor">
                      <i className="fas fa-trash-alt small text-muted"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-lg-4 ">
        <div className="card border-0 rounded-0 p-lg-4 bg-light">
          <div className="card-body">
            <h5 className="text-uppercase mb-4">Cart Total</h5>
            <ul className="list-unstyled mb-0">
              <li className="d-flex align-items-center justify-content-between">
                <strong className="text-uppercase small font-weight-bold">Subtotal</strong>
                <span className="text-muted small">${totalPrice}</span>
              </li>
              <li className="d-flex align-items-center justify-content-between">
                <strong className="text-uppercase small font-weight-bold">Shipping Charge</strong>
                <span className="text-muted small">+ ${totalPrice}</span>
              </li>
              <li className="border-bottom my-2"></li>
              <li className="d-flex align-items-center justify-content-between mb-4">
                <strong className="text-uppercase small font-weight-bold">Total</strong>
                <span>${totalPrice}</span>
              </li>
            </ul>
            <h5 className="text-uppercase my-5"></h5>
            <form id="myform" className=''>
              <div className="text-center d-flex flex-column" >
                For Checkout
                <button type="submit" className="btn btn-lg btn-outline-dark mt-3">
                  <i className="fas fa-dollar-sign mr-2"></i>Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}

export default Cart;

