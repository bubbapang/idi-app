import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../store/order";
import OrderShow from "./OrderShow";

import "./OrderModal.css";

function OrderModal() {

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
			dispatch(getOrdersThunk(user.id));
			// dispatch(getItemsThunk());
		}
	}, [dispatch, user]);

	// const filteredItems = orders.map((order) => {
	// 	return order.order_attributes.map((orderAttribute) => {
	// 		return items[orderAttribute.item_id];
	// 	});
	// });

	// if there are no orders, render a message
	if (!orders.length) {
		return (
			<div className="no-orders">
				<p>You have no orders</p>
			</div>
		);
	}

	return (
		<ul className="orders">
			{orders &&
				orders.map((order, idx) => (
					<OrderShow key={idx} order={order} />
				))}
		</ul>
	);
}

export default OrderModal;
