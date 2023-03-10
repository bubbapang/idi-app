import React from 'react';
import { Link } from 'react-router-dom';
import './StoreShow.css';

export default function StoreShow({ store }) {
    const { id, name, url } = store;

    return (
        <div className="store-show">
            <Link to={`/store/${id}`}>
                <img src={url} alt={name} />
            </Link>
            <h4>{name}</h4>
        </div>
    );
}
