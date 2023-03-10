import React from 'react';
import './ItemShow.css';
import AddToCartButton from './AddToCartButton';

export default function ItemShow({ item }) {
    const { name, price, url } = item;

    return (
        <div className="item-show">
            <div className='item-show-image-container'>
                <AddToCartButton item={item} />
                <img src={url} alt={name} />
            </div>
            <p className='item-price'>${price}</p>
            <h4 className='item-name'>{name}</h4>
        </div>
    );
}
