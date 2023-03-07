import React from 'react';
import Navigation from '../Navigation';
import StoreIndex from '../Stores/index';
import ItemIndex from '../Items/index';
import './Home.css';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getItems } from '../../store/item';

export default function Home() {
    const { storeId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems(storeId));
    }, [dispatch, storeId]);

    // check if the current URL matches "/store/:storeId"
    const isStorePage = location.pathname.startsWith('/store');

    return (
        <>
        <Navigation />
        {isStorePage ? <ItemIndex /> : <StoreIndex />}
        </>
    );
}
