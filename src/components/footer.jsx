import React from "react";
import '../styles/footer.css';
import {FaPhone ,FaMailBulk, FaTwitter, FaInstagram } from 'react-icons/fa';


export default function Footer() {

    return(
        <div>
            <footer className="flex flex-col">
                <div className="link flex">
                    <div className="social flex gap-4 m-6 p-3 text-xl">
                        <a href="tel:+256789132421" className="flex gap-1 items-center"><FaPhone/> +256 789 132 421 </a>
                        <a href="https://www.instagram.com/nanksbespoke?igsh=djNnY21tdDRhYXEx&utm_source=qr" className="flex gap-1 items-center"><FaInstagram/>@nanksbespoke </a>
                        <a href="https://x.com/nanksbespoke?s=11" className="flex gap-1 items-center"><FaTwitter/> @nankbespoke </a>
                        <a href="mailto:nanksbespoke@gmail.com" className="flex gap-1 items-center"><FaMailBulk/> nanksbespoke@gmail.com </a>
                    </div>
                    <ul>
                    </ul>
                </div>
                <p className="text-white">2025 nanks all right reserved</p>
            </footer>
        </div>
    );
};