import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCartItemThunk, updateCartItemThunk } from "../../store/cartItem";
import "./AddToCartButton.css";

export default function AddToCartButton ({ item }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user) || {};
    const { storeId } = useParams();
    
    const cartItems = useSelector(state => Object.values(state.cartItems));
    const cartItem = {
        user_id: currentUser.id,
        store_id: parseInt(storeId),
        item_id: item.id,
        quantity: 1
    };
    
    const itemInCart = cartItems.find((cartItem) => cartItem.itemId === item.id && cartItem.userId === currentUser.id);
    
    const [clicked, setClicked] = useState(false);
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (itemInCart) {
                await dispatch(updateCartItemThunk(itemInCart.id, itemInCart.quantity));
            } else {
                await dispatch(addCartItemThunk(cartItem));
            }
            setClicked(true);
            } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <button className="addtocart-button" onClick={handleClick}>
            {clicked ? "Added!" : "Add"}
        </button>
    );
};
