import React, { useState,useEffect } from 'react';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import SEO from '../components/seo';
import '../styles/men.css';
import Cookies from 'js-cookie';
import Product from '../components/product';
import api from '../api';
import Loader from '../components/loader';

function Men() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)}
  );

  useEffect(() => {
      getProducts();
  }, []);

  const getProducts = () => {
      api
          .get("/api/men/")
          .then((res) => res.data)
          .then((data) => {
                  const maleData = data.filter((product) => product.category === "male");
                  setProducts(maleData);
                  console.log(maleData)
          })
          .catch((err) => alert(err));
  };

  useEffect(() => {
    const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    setCart(existingCart);
    const totalCount = existingCart.reduce((acc, item) => acc + item.quantity, 0);
    setCount(totalCount);
    const totalAmount = existingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    const existingProduct = existingCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    Cookies.set('cart', JSON.stringify(existingCart));
    setCart(existingCart);
    setTotal(total + product.price);
    setCount(count + 1);
    alert('item added to cart')
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery);
  });
  
  return (
    <div className='mt-20'>

      {isLoading && <div className='loader-cont'>
        
        <Loader/>
      </div>}

      <SEO 
        title="Men's Collection | Tailored Suits & Clothing | Nanks Bespoke"
        description="Discover our premium collection of tailored suits and clothing for men. Handcrafted with precision and style at Nanks Bespoke."
        keywords="kampala suits , men's suits, tailored suits for men, bespoke menswear, custom suits, Nanks Bespoke men"
        pathname="/men"
      />

      <Nav total={count}/>
      <div className="links flex justify-around">
        <div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for products"
            className="border-2 border-white p-2 rounded-xl"
          />
        </div>
        <div className='flex gap-2 max-sm:hidden '>
          <a href="/women" className='border-2 border-white p-2 rounded-xl'>Women</a>
          <a href="/accessories" className='border-2 border-white p-2 rounded-xl'>Accessories</a>
        </div>
      </div>
      <div className="products">
        {filteredProducts.map((product) => (
          <Product product={product} key={product.id} onClick={handleAddToCart} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Men;