import React from 'react'
import './ItemShow.css'

export default function ItemShow ( { item } ) {
    const { name, price, image } = item;
    return (
        <>
            <h3>Item Show</h3>
            <h4>{name}</h4>
            <p>{price}</p>
            <img src={image} alt={name} />
        </>
    )
}