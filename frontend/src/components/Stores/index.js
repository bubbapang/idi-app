import React from 'react';
import StoreShow from './StoreShow';
import './StoreIndex.css';
export default function StoreIndex () {
    const stores = [
        { id: 1, name: 'Payless Supermarkets', image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_1.jpg' },
        { id: 2, name: 'Trader Joe\'s', image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_2.jpg' },
        { id: 3, name: 'Whole Foods', image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_3.jpg' },
        { id: 4, name: 'Safeway', image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_4.jpg' },
        { id: 5, name: 'Costco', image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_5.jpg' },
        { id: 6, name: 'Target', image: 'https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_6.jpg' }
    ]
    return (
        <>
            <div className='store-index'>
                {stores.map((store, idx) => <StoreShow key={idx} store={store} />)}
            </div>
        </>
    )
}