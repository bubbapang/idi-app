import React from 'react';
import StoreShow from './StoreShow';
import { getStoresThunk } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './StoreIndex.css';

export default function StoreIndex () {
    const dispatch = useDispatch();
    const stores = useSelector(state => Object.values(state.stores));
    
    // upon mounting, fetch all stores
    useEffect(() => {
        dispatch(getStoresThunk());
    }, [dispatch]);

    if (!stores) return null;

    return (
        <>
            <div className='store-index'>
                {stores.map((store, idx) => <StoreShow key={idx} store={store} />)}
            </div>
        </>
    )
}