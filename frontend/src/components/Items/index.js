import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StoreShow from '../Stores/StoreShow';
import ItemShow from './ItemShow';

import { getItemsThunk } from '../../store/item';
import { getStoresThunk } from '../../store/store';
import { setCurrentStore } from '../../store/currentStore';
import { getStoreItemsByStoreIdThunk } from '../../store/storeItem';

import './ItemIndex.css';

export default function ItemIndex() {
    const dispatch = useDispatch();

    const { storeId } = useParams();
    const stores = useSelector(state => Object.values(state.stores));
    const [prevStore, setPrevStore] = useState(null);
    const currentStore = useMemo(() => {
        return stores[storeId - 1] || {};
    }, [stores, storeId]);

    // upon mounting, fetch all items
    useEffect(() => {
        dispatch(getStoresThunk());
        dispatch(getItemsThunk());
        dispatch(getStoreItemsByStoreIdThunk(storeId));
    }, [dispatch, storeId]);

    // inside your effect
    useEffect(() => {
        if (currentStore !== prevStore) {
            dispatch(setCurrentStore(currentStore));
            setPrevStore(currentStore);
        }
    }, [dispatch, currentStore, prevStore]);

    // initializing items and storeItems
    const items = useSelector(state => state.items) || {};
    const storeItems = useSelector(state => state.storeItems) || {};
    let relevantStoreItems
    if (storeItems) {
        relevantStoreItems = Object.values(storeItems).filter(storeItem => storeItem.storeId === parseInt(storeId))
    } else {
        relevantStoreItems = {}
    }

    // filtering storeItems to only include items from the current store
    const filteredItems = Object.values(relevantStoreItems)
        .map(storeItem => items[storeItem.itemId])
        .filter(item => item !== undefined);

    if (!filteredItems || filteredItems.length === 0) return null;

    return (
        <div className='store-page'>
            <StoreShow store={stores[storeId - 1]} />
            <div className="item-index">
                {filteredItems.map((item) => (
                    <ItemShow key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
