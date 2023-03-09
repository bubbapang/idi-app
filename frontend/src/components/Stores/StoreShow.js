import React from 'react';
import { Link } from 'react-router-dom';
import './StoreShow.css';

const randomTimes = [
    '8:45 a.m.',
    '9:00 a.m.',
    '9:15 a.m.',
    '9:30 a.m.',
    '9:45 a.m.',
    '10:00 a.m.'
];

export default function StoreShow({ store }) {
    const { id, name, url } = store;
    const randomTime = randomTimes[Math.floor(Math.random() * randomTimes.length)];

    return (
        <div className="store-show">
            <h4>{name}</h4>
            <h5>Delivery by {randomTime}</h5>
            <Link to={`/store/${id}`}>
                <img src={url} alt={name} />
            </Link>
        </div>
    );
}
