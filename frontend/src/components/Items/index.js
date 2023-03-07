import React from 'react';
import ItemShow from './ItemShow';
import { getStoreItemsThunk } from '../../store/storeItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ItemIndex.css';

export default function ItemIndex() {
    const dispatch = useDispatch();
    const { storeId } = useParams();
    console.log('storeId', storeId)
    // get all items from the store
    const items = useSelector(state => Object.values(state.storeItem).filter(item => item.storeId === +storeId));
    console.log('items', items)

    // upon mounting, fetch all items
    useEffect(() => {
        dispatch(getStoreItemsThunk(storeId));
    }, [dispatch, storeId]);

    if (!items || items.length === 0) return null;

    return (
        <div className="item-index">
            {items.map((item, idx) => (
                <ItemShow key={idx} item={item} />
            ))}
        </div>
    );
}
