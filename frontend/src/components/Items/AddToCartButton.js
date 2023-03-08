import React, { useState } from "react";
// import { addToCart } from "../../store/cartItem";

export default function AddToCartButton ({ item }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        // addToCart(item);
        setClicked(true);
    };

    return (
        <button className={`add-to-cart-button ${clicked ? "clicked" : ""}`} onClick={handleClick}>
            {clicked ? "Added to cart!" : "Add to cart"}
        </button>
    );
};