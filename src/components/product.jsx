import React, { useState, useEffect } from "react";
import logo from "../assets/logo2.png";
import Loader from "./loader";


function Product({product, onClick}){
    const [isLoading, setIsLoading] = useState(true);
    const urlToCheck = product.image_url.includes('?raw=true') ? product.image_url : `${product.image_url}?raw=true`;

    useEffect(() => {
        const img = new Image();
        img.src = urlToCheck;
        img.onload = () => setIsLoading(false);
      }, [urlToCheck]);

    return(
        <div className="product flex items-center max-sm:flex-col">
                {isLoading ? (
                    // <img className="w-1/2" src="logo2.png" alt={product.name}/>
                    <Loader />
                ) : (
                    <img className="h-full object-contain" src={urlToCheck} alt={product.name} />
                )}
            <div>
                <p className="border-b-4" >{product.name}</p>
                <p>UGX {product.price}</p>
                <button className="btn" onClick={()=> onClick(product)}> <span>add to cart</span> </button>
            </div>
        </div>
    );
}

export default Product