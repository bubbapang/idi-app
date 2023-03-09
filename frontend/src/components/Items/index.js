import React, { useEffect } from 'react';
import ItemShow from './ItemShow';
import { getStoreItemsThunk } from '../../store/storeItem';
import { getItemsThunk } from '../../store/item';
import { useDispatch, useSelector } from 'react-redux';
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
    const storeItems = useSelector(state => state.storeItems);

    // filtering storeItems to only include items from the current store
    const filteredItems = Object.values(storeItems)
        .map(storeItem => items[storeItem.itemId])
        .filter(item => item !== undefined);

    if (!filteredItems || filteredItems.length === 0) return null;
    
    return (
        <div className="item-index">
            {filteredItems.map((item) => (
                <ItemShow key={item.id} item={item} />
            ))}
        </div>
    );
}
