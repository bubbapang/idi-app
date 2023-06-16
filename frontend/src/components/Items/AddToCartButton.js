import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCartItemThunk, updateCartItemThunk } from "../../store/cartItem";

import "./AddToCartButton.css";

export default function AddToCartButton({ item }) {

	// from the searchbar, this addtocartbutton needs this:
	// cartItems 245
	// id 245
	// itemId 2
	// quantity 1
	// storeId 1
	// userId 2

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user) || {};	
	const specificStoreItem = useSelector((state) => state.storeItems[item.id]) || {};

	const { storeId } = useParams()
	const processedStoreId = parseInt(storeId) || specificStoreItem.storeId;

	// i can get loop through all 6 stores, looking through all their store items. if the current item is in that store, then that store's id is set as the one that we need to add the item to the cart, from the searchbar

	const cartItems = useSelector((state) => Object.values(state.cartItems));
	const cartItem = {
		user_id: currentUser.id,
		store_id: processedStoreId,
		item_id: item.id,
		quantity: 1,
	};

	const itemInCart = cartItems.find(
		(cartItem) =>
			cartItem.itemId === item.id && cartItem.userId === currentUser.id
	);

	const [clicked, setClicked] = useState(false);

	// handle click function
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			if (itemInCart) {
				await dispatch(
					updateCartItemThunk(itemInCart.id, itemInCart.quantity)
				);
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
}
