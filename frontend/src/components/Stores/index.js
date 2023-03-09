import React, { useEffect, useState } from 'react';
import StoreShow from './StoreShow';
import { getStoresThunk } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import './StoreIndex.css';

export default function StoreIndex() {
  const dispatch = useDispatch();
  const stores = useSelector(state => Object.values(state.stores));

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getStoresThunk());
        setIsLoading(false);
      } catch (e) {
        setError('An error occurred while fetching stores. Please try again later.');
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!stores.length) {
    return <div>No stores found.</div>;
  }

  return (
    <div className="store-index">
      {stores.map(store => (
        <StoreShow key={store.id} store={store} />
      ))}
    </div>
  );
}
