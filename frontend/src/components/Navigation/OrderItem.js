// use use effect and dispatching to get the current store from state
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getCurrentStore } from '../../store/store';

import './OrderItem.css';

const OrderItem = ({ order }) => {
    console.log("order", order)

    return (
        <div className="order-item">
            <div className="order-item__top">
                <p>"Order Placed: {new Date(order.datetime * 1000).toDateString()}"</p>
                <p>"Items: {order.items.reduce((total, item) => total + item.quantity, 0)}"</p>
                <p>"Total: ${order.total}"</p>
            </div>

            <div className="order-item__bottom">
                <p>"Store: {order.storeName}"</p> {/* Replace 'storeName' with your actual store name attribute */}
                
                <div className="order-item__images">
                    {/* make a placeholder p */}
                    <p>Images</p>

                    {/* {order.items.map((item, idx) => (
                        <img key={idx} src={item.imageUrl} alt={item.title} />
                    ))} */}
                </div>

                <button>Add All Items to Cart</button>
            </div>
        </div>
    )
}

export default OrderItem;
