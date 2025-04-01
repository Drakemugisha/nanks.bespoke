import React from 'react';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import '../styles/cart.css';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '../constants';
import api from '../api';

const Cart = () => {
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [orders, SetOrder] = React.useState([]);

  React.useEffect(() => {
    const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    setCart(existingCart);
    const totalCount = existingCart.reduce((acc, item) => acc + item.quantity, 0);
    setCount(totalCount);
    const totalAmount = existingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
    getOrders();
  }, []);

    // useEffect(() => {
    //   getOrders();
    // }, []);

  const handleRemoveFromCart = (product) => {
    const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    const updatedCart = existingCart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0);
    Cookies.set('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    setTotal(total - product.price);
    setCount(count - 1);
  };

  const handleClearCart = () => {
    Cookies.set('cart', JSON.stringify([]));
    setCart([]);
    setTotal(0);
    setCount(0);
  };


  const handleOrder = (product) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    api.post('/api/order/', {
        order_date: new Date(),
        item: product.name,
        total_cost: product.price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
          if (res.status === 201) {
            alert('Order placed successfully!');
            handleRemoveFromCart(product);
          }
          else {
            alert('Failed to place order.');
          }
      }).catch((err) => {
        if (err.status === 401) {
          if(confirm('You are not logged in, please login or create an account')){
            window.location.href = '/login';
          };
        }else{
          alert(err.message || err.toString());
        }
      }
      )


      getOrders();
  };

  const getOrders = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.get('api/order/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response);
      SetOrder(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  
  // const handleDeleteOrder = (orderId) => {
  //   const token = localStorage.getItem(ACCESS_TOKEN);
  
  //   api.delete(`api/orders/${orderId}/`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 204) {
  //         alert('Order deleted successfully!');
  //         getOrders();
  //       } else {
  //         alert('Failed to delete order.');
  //       }
  //     })
  //     .catch((err) => alert(err));
  // };

  return (
    <div>
      <Nav total={count} />

        <div className="cartcontainer">

        {cart.length === 0 ? (
            <p className='text-2xl'>Your cart is empty.
                shop some items <a href="/men" className='text-blue-700 border-b-2'>shop</a>
            </p>  
        ) : (
            <div>
              <ul className='flex gap-3 flex-wrap'>
                  {cart.map((product) => (
                  <li key={product.id} className='cart-item'>
                      <p className='text-white border-b-4'>
                      {product.name} x {product.quantity} = UGX {product.price * product.quantity}
                      </p>
                      <img className='cartimg' src={product.image_url.includes("?raw=tru") ? product.image_url : `${product.image_url}?raw=true`} alt={product.name} />
                      <button className='bg-red-400 rounded-md p-1' onClick={() => handleRemoveFromCart(product)}>
                      <span>Remove</span>
                      </button>
                      <button className="btn" onClick={() => handleOrder(product)}>
                      <span>order</span>
                      </button>
                  </li>
                  ))}
              </ul>
              <p>Total: UGX {total}</p>
              <button className="btn" onClick={handleClearCart}>
                  <span>Clear Cart</span>
              </button>
            </div>
        )}

          <p className='text-2xl bg-white p-1 mt-2'>orders</p> <br />

        {orders.length === 0 ? (
          <p className='text-2xl'>No orders yet or not logged in, login <a href="/login" className='text-blue-700 border-b-2'>here</a></p>
        ) : (

        <ul className='flex gap-2 flex-wrap'>
          {orders.map((order) =>(
            <li key={order.id} className='mt-2 border rounded-xl p-4 order-item'>
              <p>Order ID: {order.id}</p>
              <p>Order name: {order.item}</p>
              <p>Order Date: {order.order_date}</p>
              <p>Order Cost: UGX {order.total_cost}</p>
              {/* <button onClick={() => handleDeleteOrder(order.id)}> delete order</button> */}
            </li>
          ))}
        </ul>
        )}
        </div>
      <Footer />
    </div>
  );
};

export default Cart;