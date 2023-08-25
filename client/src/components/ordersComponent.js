import React, { useState, useEffect } from 'react';
import './ordersComponent.css';

function OrdersComponent({ user }) {
    // Assuming `user` prop contains registered user's details

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderingPerson, setOrderingPerson] = useState(user.name); // default to user name but editable
    const [items, setItems] = useState(''); // simple text area for order items for now
    const [shippedDate, setShippedDate] = useState(''); // only for salespeople

    // Base URL for the backend
    const baseURL = 'https://idi-online-production.up.railway.app';

    // Fetch orders from the backend
    const fetchOrders = async () => {
        try {
            const response = await fetch(`${baseURL}/orders`);
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Add a new order
    const createOrder = async () => {
        try {
            await fetch(`${baseURL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company: user.company,
                    address: user.address,
                    orderingPerson,
                    items,
                    orderDate: new Date().toISOString(), // current date
                    shippedDate: user.role === 'salesperson' ? shippedDate : null
                })
            });
            resetForm();
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    // Update an order by ID
    const updateOrder = async () => {
        if (!selectedOrder) return;
        try {
            await fetch(`${baseURL}/orders/${selectedOrder._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderingPerson,
                    items,
                    shippedDate: user.role === 'salesperson' ? shippedDate : null
                })
            });
            resetForm();
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    // Delete an order by ID
    const deleteOrder = async (id) => {
        try {
            await fetch(`${baseURL}/orders/${id}`, { method: 'DELETE' });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setSelectedOrder(null);
        setOrderingPerson(user.name);
        setItems('');
        setShippedDate('');
    };

    // Load orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <div className='order-box'>
                <h2>{selectedOrder ? "Update Order" : "Place Order"}</h2>
                <input type="text" placeholder="Ordering Person" value={orderingPerson} onChange={(e) => setOrderingPerson(e.target.value)} />
                <textarea placeholder="Items" value={items} onChange={(e) => setItems(e.target.value)} />
                {user.role === 'salesperson' && (
                    <input type="date" placeholder="Shipped Date" value={shippedDate} onChange={(e) => setShippedDate(e.target.value)} />
                )}
                {selectedOrder ? (
                    <button onClick={updateOrder}>Update Order</button>
                ) : (
                    <button onClick={createOrder}>Create Order</button>
                )}
            </div>
            <div className='past-orders'>
                <h2>Past Orders</h2>
                <ul className='order-list'>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <h3>{order.company}</h3>
                            <p><strong>Ordering Person:</strong> {order.orderingPerson}</p>
                            <p><strong>Items:</strong> {order.items}</p>
                            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            {order.shippedDate && <p><strong>Shipped Date:</strong> {new Date(order.shippedDate).toLocaleDateString()}</p>}
                            <button onClick={() => { setSelectedOrder(order); setOrderingPerson(order.orderingPerson); setItems(order.items); }}>Edit</button>
                            <button onClick={() => deleteOrder(order._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrdersComponent;
