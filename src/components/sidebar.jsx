import React from "react";
import '../styles/sidebar.css'

export default  function SideBar({state}){

    return(
        <div>

            {state ? 
                <div className="side-bar active">
    
                    <ul>
                        <li> <a href="/"> <span>Home</span> </a> </li>
                        <li> <a href="/custom"> <span>Book Appointment</span> </a> </li>
                        <li> <a href="/men"> <span>Shop for Men</span> </a> </li>
                        <li> <a href="/women"> <span>Shop for Women</span> </a> </li>
                        <li> <a href="/accessories"> <span>Shop for Accessories</span> </a> </li>
                    </ul>
                </div> :
                <div className="side-bar">

                    <ul>
                        <li> <a href="/"> <span>Home</span> </a> </li>
                        <li> <a href="/custom"> <span>Book Appointment</span> </a> </li>
                        <li> <a href="/men"> <span>Shop for Men</span> </a> </li>
                        <li> <a href="/women"> <span>Shop for Women</span> </a> </li>
                        <li> <a href="/accessories"> <span>Shop for Accessories</span> </a> </li>
                    </ul>
                </div>
            }
        </div>



    )
}