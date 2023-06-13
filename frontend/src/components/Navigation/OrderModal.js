import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../store/order";
import OrderItem from "./OrderItem"; // Import OrderItem component here

import "./OrderModal.css";

function OrderModal() {
	console.log("rendering the order modal");

	const dispatch = useDispatch();

	// Selector to get the orders from the state
	const user = useSelector((state) => state.session.user);
	const orders = useSelector((state) => Object.values(state.orders));
	// const items = useSelector((state) => state.items);

	// we need to filter all the items that are in the orders
	// why?
	// so we know which items to display in the order modal
	// then we render the item show component for each item

	// Fetch the orders when the component mounts
	useEffect(() => {
		if (user) {
			console.log("there is a user");
			console.log("user.id", user.id);
			dispatch(getOrdersThunk(user.id));
			// dispatch(getItemsThunk());
		}
	}, [dispatch, user]);

	// const filteredItems = orders.map((order) => {
	// 	return order.order_attributes.map((orderAttribute) => {
	// 		return items[orderAttribute.item_id];
	// 	});
	// });

	console.log("rendering the orders modal");
	console.log("orders", orders);

	return (
		<ul className="orders">
			{orders &&
				orders.map((order, idx) => (
					<OrderItem key={idx} order={order} /> // Use OrderItem component here
				))}
		</ul>
	);
}

export default OrderModal;
