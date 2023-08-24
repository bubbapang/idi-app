import React, { useState, useEffect } from 'react';
import './ordersComponent.css';

function OrdersComponent() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Base URL for the backend
    const baseURL = 'https://idi-online-production.up.railway.app';

    // READ: Fetch orders from the backend
    const fetchOrders = () => {
        fetch(`${baseURL}/orders`)
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((err) => console.error(err));
    };
    
    // CREATE: Add a new order
    const createOrder = () => {
        fetch(`${baseURL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })
            .then(() => {
                setTitle('');
                setContent('');
                fetchOrders();
            })
            .catch((err) => console.error(err));
    };
    
    // UPDATE: Update a order by ID
    const updateOrder = () => {
        if (!selectedOrder) return;
        fetch(`${baseURL}/orders/${selectedOrder._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })
            .then(() => {
                setSelectedOrder(null);
                setTitle('');
                setContent('');
                fetchOrders();
            })
            .catch((err) => console.error(err));
    };
    
    // DELETE: Delete a order by ID
    const deleteOrder = (id) => {
        fetch(`${baseURL}/orders/${id}`, { method: 'DELETE' })
            .then(() => fetchOrders())
            .catch((err) => console.error(err));
    };
    

    // Load orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <div className='order-box'>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                {selectedOrder ? (
                    <button onClick={updateOrder}>Update Order</button>
                ) : (
                    <button onClick={createOrder}>Create Order</button>
                )}
            </div>
            <ul className='order-list'>
                {orders.map((order) => (
                    <li key={order._id}>
                        <h3>{order.title}</h3>
                        <p>{order.content}</p>
                        <button onClick={() => { setSelectedOrder(order); setTitle(order.title); setContent(order.content); }}>Edit</button>
                        <button onClick={() => deleteOrder(order._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrdersComponent;
