import React from "react";
import '../styles/sidebar.css'

export default  function SideBar({state}){

    return(
        <div>

            {state ? 
                <div className="side-bar active">
    
                    <ul>
                        <li> <a href="/"> <span>home</span> </a> </li>
                        <li> <a href="/custom"> <span>appointment</span> </a> </li>
                        <li> <a href="/men"> <span>men</span> </a> </li>
                        <li> <a href="/women"> <span>women</span> </a> </li>
                        <li> <a href="/accessories"> <span>accessories</span> </a> </li>
                    </ul>
                </div> :
                <div className="side-bar">

                    <ul>
                        <li> <a href="/"> <span>home</span> </a> </li>
                        <li> <a href="/men"> <span>men</span> </a> </li>
                        <li> <a href="/women"> <span>women</span> </a> </li>
                        <li> <a href="/accessories"> <span>accessories</span> </a> </li>
                    </ul>
                </div>
            }
        </div>



    )
}