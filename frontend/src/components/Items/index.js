import React from 'react';
import ItemShow from './ItemShow';
import './ItemIndex.css';

export default function ItemIndex() {
    const items = [
        {
        id: 1,
        name: 'Watermelon',
        price: '$3.99',
        image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_1.jpg',
        },
        {
        id: 2,
        name: 'Green Onion',
        price: '$1.99',
        image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_2.jpg',
        },
        {
        id: 3,
        name: 'Dragon Fruit',
        price: '$4.99',
        image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_3.jpg',
        },
    ];

    if (!items) {
        return null; // or render a loading indicator
    }

    return (
        <div className="item-index">
        {items.map((item, idx) => (
            <ItemShow key={idx} item={item} />
        ))}
        </div>
    );
}
