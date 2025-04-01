import React from "react";
import Nav from "../components/navbar";
import Footer from "../components/footer";

export default function NotFound(){
    return(
        <div>
            <Nav></Nav>

            <div className="h-screen flex justify-center items-center flex-col">
                <h1 className="text-red-600 text-4xl">404</h1>
                <h1>page not found</h1>
                <a href="/men" className="border-b-4 mt-9 text-blue-700">go back to shop</a>
            </div>

            <Footer></Footer>
        </div>
    )
}