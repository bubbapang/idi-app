import React from "react";
import { useState } from "react";
import ProduceList from "../ProduceList/ProduceList";
import Cart from "../Cart/Cart";
import "./Home.css";

export default function Home() {
    const [showCart, setShowCart] = useState(false);

    return(
        <>
            {/* this is the nav bar at the top */}
            <nav>
                <h1>Grocery Store</h1>
                <button className="checkout-button" onClick={() => setShowCart(true)}>
                    <i className="fas fa-shopping-bag" />
                    Checkout
                </button>
            </nav>

            {/* this is the main content of the page */}
            <main style={showCart ? { marginRight: '300px' } : {}} >
                <ProduceList />
            </main>

            {/* this is the sidebar that shows the cart */}
            <div className="sidebar" style={showCart ? { transform: 'translateX(-100%)' } : {}}>
                <div className="sidebar-header">
                    <button className="arrow-button" onClick={() => setShowCart(false)}>
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
                <Cart />
            </div>
        </>
    )
}