import React, { useState, useEffect } from 'react';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import { ACCESS_TOKEN } from '../constants';
import api from '../api';
import '../styles/cart.css';

function Custom() {
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [customs, setCustoms] = useState([]);

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
        .post("/api/custom/", { gender, email, phone_number },
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
            setGender("");
            setEmail("");
            setNumber("");
            getCustoms();
        })
        .catch((err) => alert(err));
   };

  return (
    <div>
      <Nav />

        <div className='flex flex-col items-center justify-center h-screen'>
            
            <h1>make appointment</h1>
            <form onSubmit={createNote} className='flex flex-col gap-3 appointment'>
                <label>
                gender:
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </label>
                <label>
                email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                phone number:
                <input type="text" value={phone_number} onChange={(e) => setNumber(e.target.value)} />
                </label>
                <button className='border p-2 bg-white' type="submit">Customize suit</button>
            </form>
            <h2 className='mt-2 border-b-2 text-2xl'>appointments</h2>
            <ul className='flex flex-wrap'>
                {customs.map((custom) => (
                  <li className='appointment'>
                    <p>gender: {custom.gender}</p>
                    <p>email: {custom.email}</p>
                    <p>phone number: {custom.phone_number}</p>
                  </li>
                ))}
            </ul>
        </div>

      <Footer />
    </div>
  );
}

export default Custom;