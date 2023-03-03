
import React from 'react';

export default function ItemIndex (props) {
    const { item } = props;
    return (
        <div>
            <img src={item.image} alt={item.name} />
        </div>
    )
}