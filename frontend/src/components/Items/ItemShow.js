import React from 'react';
import './ItemShow.css';
import AddToCartButton from './AddToCartButton';

export default function ItemShow({ item }) {
    const { name, price, url } = item;

    return (
        <div className="item-show">
            <AddToCartButton product={item} />
            <h4>{name}</h4>
            <p>{price}</p>
            <img src={url} alt={name} />
        </div>
    );
}
