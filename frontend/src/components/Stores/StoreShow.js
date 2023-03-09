import React from 'react';
import { Link } from 'react-router-dom';
import './StoreShow.css';

const times = [
    '35 minutes',
    '40 minutes',
    'By 7:00 PM',
    'By 9:30 PM',
    '45 minutes',
    'By 8:00 PM',
];

export default function StoreShow({ store }) {
    const { id, name, url } = store;
    const time = times[Math.floor(Math.random() * times.length)];

    return (
        <div className="store-show">
            <Link to={`/store/${id}`}>
                <img src={url} alt={name} />
            </Link>
            <h4>{name}</h4>
            <h5>{time}</h5>
        </div>
    );
}
