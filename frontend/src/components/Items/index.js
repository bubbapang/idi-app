import React from 'react';
import ItemShow from './ItemShow';
import { getStoreItemsThunk } from '../../store/storeItem';
import { getItemsThunk } from '../../store/item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ItemIndex.css';

export default function ItemIndex() {
    const dispatch = useDispatch();
    const { storeId } = useParams();

    // upon mounting, fetch all items
    useEffect(() => {
        dispatch(getItemsThunk());
        dispatch(getStoreItemsThunk(storeId));
    }, [dispatch, storeId]);

    // initializing items and storeItems
    const items = useSelector(state => state.items);
    console.log('items', items)
    const storeItems = useSelector(state => Object.values(state.storeItems));
    console.log('storeItems', storeItems)

    // filtering storeItems to only include items from the current store
    const filteredItems = [];
    storeItems.forEach(storeItem => {
        filteredItems.push(items[storeItem.itemId]);
    });

    if (!filteredItems || filteredItems.length === 0) return null;

    console.log('filteredItems', filteredItems)

    return (
        <div className="item-index">
            {filteredItems.map((item, idx) => (
                <ItemShow key={idx} item={item} />
            ))}
        </div>
    );
}
