import React from "react";
// import { useState } from "react";
// import Cart from "../Cart";
import "./Home.css";
import StoreIndex from "../Stores";
import Navigation from "../Navigation";

export default function Home() {
    // const [showCart, setShowCart] = useState(false);

    return(
        <>
            {/* this is the nav bar at the top */}
            <nav>
                <h1 id="website-title">grocerease</h1>
                {/* <button className="checkout-button" onClick={() => setShowCart(true)}>
                    <i className="fas fa-shopping-bag" />
                    Checkout
                </button> */}
                <Navigation />
            </nav>

            {/* this is the main content of the page */}
            <div className="main-content">
                <StoreIndex />
            </div>

            {/* this is the sidebar that shows the cart */}
            {/* <div className="sidebar" style={showCart ? { transform: 'translateX(-100%)' } : {}}>
                <div className="sidebar-header">
                    <button className="arrow-button" onClick={() => setShowCart(false)}>
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
                <Cart />
            </div> */}
        </>
    )
}