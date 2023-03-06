import React from 'react';
import './StoreShow.css';

export default function StoreShow ( { store } ) {
    const { name, image } = store;
    return (
        <>
            <div className='store-show'>
                <h3>Store Show</h3>
                <h4>{name}</h4>
                <img src={image} alt={name} />
            </div>
        </>
    )
}