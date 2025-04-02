import React, { useState, useEffect } from 'react';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import { ACCESS_TOKEN } from '../constants';
import api from '../api';
import '../styles/cart.css';
import Loader from '../components/loader';

function Custom() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [customs, setCustoms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)}
  );

  useEffect(() => {
    getCustoms();
  }, []);

  const getCustoms = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.get('api/custom/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response);
      setCustoms(response.data);
    } catch (error) {
      alert('Error fetching customs:', error.message);
    }
  };

  const createNote = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(ACCESS_TOKEN)
    api
        .post("/api/custom/", { date, location},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
            if (res.status === 201) alert("custom created!");
            else alert("Failed to create custom.");
            setDate("");
            setLocation("");
            getCustoms();
        })
        .catch((err) => alert(err));
   };

  return (
    <div>

      {isLoading && <div className='loader-cont'>
        
        <Loader/>
      </div>}

      <Nav />

        <div className='flex flex-col items-center justify-center h-screen'>
            
            <h1>make appointment</h1>
            <form onSubmit={createNote} className='flex flex-col gap-3 appointment'>
                <label>
                date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                location:
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <button className='border p-2 bg-white' type="submit">Customize suit</button>
            </form>
            <h2 className='mt-2 border-b-2 text-2xl'>appointments</h2>
            <ul className='flex flex-wrap'>
                {customs.map((custom) => (
                  <li className='appointment'>
                    <p>email: {custom.user.email}</p>
                    <p>location: {custom.location}</p>
                    <p>date: {custom.date}</p>
                  </li>
                ))}
            </ul>
        </div>

      <Footer />
    </div>
  );
}

export default Custom;