// use use effect and dispatching to get the current store from state
import React from "react";
import { useSelector } from "react-redux";
import { addCartItemThunk, updateCartItemThunk } from "../../store/cartItem";
import { useDispatch } from "react-redux";
import {setCurrentStore} from "../../store/currentStore";
import "./OrderShow.css";

const OrderShow = ({ order }) => {
	const dispatch = useDispatch();

	// getting the store from the state
	const stores = useSelector((state) => Object.values(state.stores));
	// filtering the stores to get the specific store
	const specificStore = stores.find(
		(store) => store.id === order.storeId
	);

	// getting items from the state
	const items = useSelector((state) => Object.values(state.items));
	// filtering the items to get the relevant items
	const relevantItems = items.filter((item) =>
		order.items.map((orderItem) => orderItem.itemId).includes(item.id)
	);

	// getting the current user from the state
	const currentUser = useSelector((state) => state.session.user) || {};

	// getting cart items from the state
	const cartItems = useSelector((state) => Object.values(state.cartItems));

	// make a handler function for the button
	const handleClick = async (e) => {
		// prevent the default behavior
		e.preventDefault();

		// for every relevant item
		for (let i = 0; i < relevantItems.length; i++) {
			// make a specific item variable
			const specificItem = relevantItems[i];

			// we create a cart item object for each item, with the format it wants
			const cartItem = {
				user_id: currentUser.id,
				store_id: specificStore.id,
				item_id: specificItem.id,
				quantity: 1,
			};

			// we check if the item is in the cart. Boolean
			const itemInCart = cartItems.find(
				(cartItem) =>
					cartItem.itemId === specificItem.id && cartItem.userId === currentUser.id
			);

			// if the item is in the cart, we update the quantity
			if (itemInCart) {
				await dispatch(updateCartItemThunk(itemInCart.id, itemInCart.quantity+1));
			} else {
				// if the item is not in the cart, we add it to the cart
				await dispatch(addCartItemThunk(cartItem));
			}
		}

		// we set the current store to the store of the order when the add items to cart button is pressed
		await dispatch(setCurrentStore(specificStore));
	};

	return (
		<div className="order-show">
			<div className="order-show__top">
				<p>
					"Order Placed:{" "}
					{new Date(order.datetime * 1000).toDateString()}"
				</p>
				<p>
					"Items:{" "}
					{order.items.reduce(
						(total, item) => total + item.quantity,
						0
					)}
					"
				</p>
				<p>"Total: ${order.total}"</p>
			</div>

			<div className="order-show__bottom">
				<p>"Store: {specificStore.name}"</p>{" "}
				{/* Replace 'storeName' with your actual store name attribute */}
				<div className="order-show__images">
					{relevantItems.map((item) => (
						<img
							key={item.id}
							src={item.url}
							alt={item.name}
						/>
					))}
				</div>
				<button className="add-items-to-cart-button" onClick={handleClick}>Add All Items to Cart</button>
			</div>
		</div>
	);
};

export default OrderShow;
