import React from "react";
import '../styles/nav.css';
import SideBar from "./sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import logo from '../assets/logo2.png';
import { FaWhatsapp } from 'react-icons/fa';

export default function Nav({total}){

    const [isActive, SetIsActive] = useState(null)

    
    const handleClick = (e) => {
    e.stopPropagation();
    SetIsActive(!isActive);
    }
    window.addEventListener('click', ()=>{
    SetIsActive(false);
    })

    const handleLinkClick = ()=>{
        window.href = "/men"
    }
    return(
        <div>
            <SideBar state={isActive}/>
            <nav>
                
                <img src={logo} alt="company logo" />

                <div>
                    <ul className="flex justify-between gap-1">
                        <li> <a href="/"> <span>Home</span> </a> </li>
                        <li> <a href="/men"> <span>Shop</span> </a> </li>
                        <li>  <a href="/custom"> <span>Book Appointment</span></a> </li>
                    </ul>

                    {isActive ? 
                        <div className="hamburger active" onClick={handleClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div> : 
                        <div className="hamburger" onClick={handleClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    }

                </div>
                <div className="shoping flex gap-3">
                    <a href="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} /> <p>{total}</p>
                    </a>
                </div>
                
                <a href="https://www.facebook.com/" id="whatsapp"><FaWhatsapp/></a>
            </nav>
        </div>
    )

}