import React, { useState, useEffect } from 'react';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import SEO from '../components/seo';
import '../styles/men.css';
import Cookies from 'js-cookie';
import Product from '../components/product';
import api from '../api';
import Loader from '../components/loader';

function Accessories() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getProducts(1, 'accessories');
  }, []);

  const getProducts = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/men/', {
        params: {
          page: pageNumber,
          category: 'accessories',
        },
      });
      
      setProducts(response.data.results || []);
      setPagination(response.data);
      setCurrentPage(pageNumber);
      console.log('Pagination data:', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // Fallback to the old method if the new endpoint doesn't exist
      try {
        const response = await api.get('/api/men/');
        const data = response.data;
        const accessoriesData = Array.isArray(data) 
          ? data.filter((product) => product.category === "accessories")
          : [];
        
        // Create a simple pagination object for the fallback approach
        const itemsPerPage = 10; // Adjust as needed
        const startIdx = (pageNumber - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedData = accessoriesData.slice(startIdx, endIdx);
        
        setPagination({
          count: accessoriesData.length,
          next: endIdx < accessoriesData.length ? pageNumber + 1 : null,
          previous: pageNumber > 1 ? pageNumber - 1 : null,
          results: paginatedData,
        });
        
        setProducts(paginatedData);
        setCurrentPage(pageNumber);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        alert('Failed to load products');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = (pageNumber) => {
    console.log('Handling pagination with page number:', pageNumber);
    
    // If pageNumber is null or undefined and we're going to previous page,
    // we should go to page 1
    if (pageNumber === null || pageNumber === undefined) {
      // Check if this is likely a "previous" operation from page 2
      if (currentPage > 1) {
        getProducts(1);
        return;
      }
    }
    
    const page = parseInt(pageNumber, 10);
    if (!isNaN(page)) {
      getProducts(page);
    } else {
      console.error('Invalid page number:', pageNumber);
    }
  };

  // Function to extract page number from URL
  const extractPageNumber = (url) => {
    if (!url) return null;
    
    // If url is just a number (from our fallback pagination)
    if (!isNaN(parseInt(url, 10))) {
      return parseInt(url, 10);
    }
    
    try {
      // Check if the URL has a page parameter
      if (url.includes('page=')) {
        const pageParam = url.split('page=')[1];
        if (pageParam) {
          return pageParam.split('&')[0]; // Handle case where there are other params after page
        }
      } 
      // For URLs without page parameter, check if it's the base URL (for page 1)
      else if (url.includes('/api/accessories/') || url.includes('/api/men/')) {
        // This is likely the base URL for page 1
        return 1;
      }
      
      return null;
    } catch (error) {
      console.error('Error extracting page number:', error);
      return null;
    }
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
      const updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      Cookies.set('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];
      Cookies.set('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    
    setTotal(total + product.price);
    setCount(count + 1);
    alert('Item added to cart');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery);
  });

  // Simple handlers for Previous and Next
  const handlePreviousClick = () => {
    console.log('Previous button clicked');
    console.log('Previous URL:', pagination.previous);
    
    // Special case: if we're on page 2 and previous URL has no page parameter
    if (currentPage === 2 && pagination.previous && !pagination.previous.includes('page=')) {
      console.log('Special case: Going to page 1');
      getProducts(1);
      return;
    }
    
    const pageNumber = extractPageNumber(pagination.previous);
    console.log('Extracted page number:', pageNumber);
    handlePagination(pageNumber);
  };

  const handleNextClick = () => {
    console.log('Next button clicked');
    console.log('Next URL:', pagination.next);
    const pageNumber = extractPageNumber(pagination.next);
    console.log('Extracted page number:', pageNumber);
    handlePagination(pageNumber);
  };

  return (
    <div className='mt-20'>
      {isLoading && (
        <div className='loader-cont'>
          <Loader />
        </div>
      )}

      <SEO 
        title="Premium Accessories | Complete Your Look | Nanks Bespoke"
        description="Complete your look with our premium accessories collection. Handpicked to complement our bespoke suits at Nanks Bespoke."
        keywords="fashion accessories, suit accessories, premium accessories, Nanks Bespoke accessories"
        pathname="/accessories"
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
        <div className='flex gap-2 max-sm:hidden'>
          <a href="/men" className='border-2 border-white p-2 rounded-xl'>Men</a>
          <a href="/women" className='border-2 border-white p-2 rounded-xl'>Women</a>
        </div>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product product={product} key={product.id} onClick={handleAddToCart} />
          ))
        ) : (
          <p className="text-center w-full p-4"><Loader/></p>
        )}
      </div>
      
      <div className="pagination flex justify-center gap-4 my-4">
        {pagination.previous && (
          <button 
            onClick={handlePreviousClick}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        
        <span className="px-4 py-2">Page {currentPage}</span>
        
        {pagination.next && (
          <button 
            onClick={handleNextClick}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Accessories;