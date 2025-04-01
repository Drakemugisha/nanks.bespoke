import React from "react";
import '../styles/footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


export default function Footer() {

    return(
        <div>
            <footer className="flex flex-col">
                <div className="link flex">
                    <div className="social flex gap-4 m-6 p-3 text-xl">
                        <a href="https://www.facebook.com/" className="flex gap-1 items-center"><FaFacebook/> facebook </a>
                        <a href="https://www.facebook.com/" className="flex gap-1 items-center"><FaInstagram/> instagram </a>
                        <a href="https://www.facebook.com/" className="flex gap-1 items-center"><FaTwitter/> twitter </a>
                    </div>
                    <ul>
                        <li> <a href="#"> <span>home</span> </a> </li>
                        <li> <a href="#"> <span>shop</span> </a> </li>
                        <li> <a href="#"> <span>articles</span> </a> </li>
                    </ul>
                </div>
                <p className="text-white">2025 nanks all right reserved</p>
            </footer>
        </div>
    );
};