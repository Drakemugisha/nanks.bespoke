import React, { useState, useEffect } from 'react';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import SEO from '../components/seo'
import '../styles/home.css';
import image from '../assets/IMG-20250118-WA0123.jpg';
import image2 from '../assets/IMG-20250118-WA0115.jpg';
import gold from '../assets/gold.jpg';
import shoe from '../assets/shoe.jpg';
import manne from '../assets/mannequin.jpg';
import threads from '../assets/threads.jpg'
import Loader from '../components/loader';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import api from '../api';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [full_names, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)}
  );

  const leaveMessage = (e) => {
    e.preventDefault();
    api
        .post("/api/message/", { full_names, email, phone_number, message } )
        .then((res) => {
            if (res.status === 201) alert("message  sent!");
            else alert("Failed to send message.");
            setName("");
            setEmail("");
            setNumber("");
            setMessage("")
        })
        .catch((err) => alert(err));
   };


  return (
    <div>

       <SEO 
        title="Nanks Bespoke | Premium Tailored Suits & Clothing"
        description="Experience premium bespoke tailoring at Nanks Bespoke. suits around kampala and the rest of uganda for 10+ years."
        keywords="suit in kampala, kampala suits, uganda suits ,bespoke suits, tailored clothing, custom suits, premium tailoring, Nanks Bespoke"
        pathname="/"
      />

      {isLoading && <div className='loader-cont'>
        
          <Loader/>
        </div>}
      <Nav/>
      <section className="hero mt-8" >
        <div className="container">
          <div className="content">
            <h2>Nanks Bespoke</h2>
            <p>Uniquely yours, perfectly tailored</p>

            <div className='mt-4'>
            <a href="/men" className='mr-2'>
              <button className="btn"> <span> Buy Now</span></button>
            </a>
            <a href="/custom">
              <button className="btn"> <span> book appointment</span></button>
            </a>

            </div>
          </div>

            <img src={image} alt="Image description" />        
          </div>
      </section>

      <div className="fit-container">
        <div className="fit">
          <img src={gold} alt="" loading='lazy' />
          <img src={image2} alt="" />
          <img src={manne} alt="" />
          <div className="fit-everything">
            <p>Crafting timeless style with expert tailoring and premium materials. From luxurious fabrics to precision accessories, we provide everything you need for a flawless bespoke experience.</p>
            <div className="btn">
              <span> <a href="/custom"> book appointment </a></span>
            </div>
          </div>
          <img src={threads} alt="" />
          <img src={shoe} alt="" />
    
        </div>
      </div>

      <div className="us text-xl">
        <h2>Why us?</h2>
        <p>We have been making suits for 10+ years, we know what we are doing</p>
        <div className="social flex gap-4 m-6 p-3 text-3xl">
          <a href="https://www.facebook.com/"><FaFacebook/></a>
          <a href="https://www.facebook.com/"><FaInstagram/></a>
          <a href="https://www.facebook.com/"><FaTwitter/></a>
        </div>
      </div>

      {/* <h2 style="display: flex; justify-content: center; align-items: center;">shop</h2> */}
      <div className="shop">
        <img src={manne} alt=""/>
        <img src={image2} alt=""/>
      </div>

        <p className='flex justify-center items-center'>leave us a message</p>
      <div className="shop-link flex justify-center">
        <div className='flex'>
          <div className="p-10 max-sm:p-1 text-4xl flex flex-col gap-7 h-5/6 justify-center items-center">
            <a href="https://www.facebook.com/"><FaFacebook/></a>
            <a href="https://www.facebook.com/"><FaInstagram/></a>
            <a href="https://www.facebook.com/"><FaTwitter/></a>
            <a href="https://www.facebook.com/"><FaWhatsapp/></a>
          </div>
          <form onSubmit={leaveMessage} className='flex flex-col justify-center items-center p-5 m-4'>
            <label>full name</label>
            <input type="text" value={full_names} onChange={(e) => setName(e.target.value)} />
            <label>email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>phone number</label>
            <input type="text" value={phone_number} onChange={(e) => setNumber(e.target.value)} />
            <label>message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea> <br />
            <button type='submit'>submit</button>
          </form>
        </div>
        </div>

      <Footer />
  </div>
  );
}

export default Home;
