import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { getItemsThunk } from "../../store/item";
import { getCartItemsThunk } from "../../store/cartItem";
import { deleteCartItemThunk } from "../../store/cartItem";
import { addOrderThunk } from "../../store/order";
import "./Cart.css";

export default function Cart() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userId = sessionUser?.id;
	const items = useSelector((state) => state.items);
	const cartItems = useSelector((state) => state.cartItems);
	const itemsArray = Object.values(items);
	const cartItemsArray = Object.values(cartItems);

	// what is this doing?
	const filteredItems =
		itemsArray.length && cartItemsArray.length
			? cartItemsArray.map((cartItem) => {
					const filteredItem = items[cartItem.itemId];
					return [filteredItem, cartItem];
			  })
			: [];

	useEffect(() => {
		dispatch(getItemsThunk());
		dispatch(getCartItemsThunk(userId));
	}, [dispatch, userId]);

	// when the user presses checkout
	const onSubmit = (e) => {
		e.preventDefault();

		// Add all cart items to the orders table
		async function addOrders() {
			const totalCost = filteredItems
				.reduce((acc, combo) => {
					const [filteredItem, cartItem] = combo;
					return acc + filteredItem.price * cartItem.quantity;
				}, 0)
				.toFixed(2);

			// create the order object
			const order = {
				order: {
					user_id: userId,
					
					total: parseFloat(totalCost),
					order_attributes: cartItemsArray.map((cartItem) => {
						return {
							item_id: cartItem.itemId,
							quantity: cartItem.quantity,
						};
					}),
				},
			};

			// user id, total,
			await dispatch(addOrderThunk(order));
		}
		addOrders();

		// Delete all cart items from frontend state alone
		async function deleteCartItems() {
			cartItemsArray.forEach((cartItem) => {
				dispatch(deleteCartItemThunk(cartItem.id));
			});
		}
		deleteCartItems();

		const purchasedItems = cartItemsArray
			.map((cartItem) => {
				const item = items[cartItem.itemId];
				return `${cartItem.quantity} of ${item.name}`;
			})
			.join("\n");
		// alert the user they checked out
		window.alert(`Purchased the following:\n${purchasedItems}`);
	};

	// round to 2 decimal places
	const totalCost = filteredItems
		.reduce((acc, combo) => {
			const [filteredItem, cartItem] = combo;
			return acc + filteredItem.price * cartItem.quantity;
		}, 0)
		.toFixed(2);

	if (!cartItemsArray.length) {
		return <div className="cart">Your personal cart is empty</div>;
	} else {
		return (
			<>
				{/* <div className="cart-header">Cart</div> */}
				<div className="cart">
					<ul className="cart-items">
						{filteredItems.map((combo, idx) => {
							const [filteredItem, cartItem] = combo;
							return (
								<CartItem
									key={cartItem.id}
									item={filteredItem}
									cartItem={cartItem}
								/>
							);
						})}
					</ul>
					<hr />
					<form onSubmit={onSubmit}>
						<button type="submit">
							Go To Checkout ${totalCost}
						</button>
					</form>
				</div>
			</>
		);
	}
}
