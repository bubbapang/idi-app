
import React from 'react'

export default function ItemShow (props) {
    const { item } = props
    return (
        <div>
            <img src={item.image} alt={item.name} />
        </div>
    )
}