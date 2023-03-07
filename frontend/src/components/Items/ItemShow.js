import React from 'react';
import './ItemShow.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart';

export default function ItemShow({ item }) {
    const dispatch = useDispatch();

    const { name, price, image } = item;

    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    return (
        <div className="item-show">
            <h4>{name}</h4>
            <p>{price}</p>
            <img src={image} alt={name} onClick={handleAddToCart} />
        </div>
    );
}
