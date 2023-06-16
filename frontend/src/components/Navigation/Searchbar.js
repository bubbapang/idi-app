import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchResults } from "../../store/search";
import { getStoreItemsThunk } from '../../store/storeItem';
import AddToCartButton from '../Items/AddToCartButton';
import './Search.css';

// Hook that alerts clicks outside of the passed ref
function useOutsideAlerter(ref, onOutsideClick) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onOutsideClick]);
}

export default function Searchbar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const items = useSelector(state => Object.values(state.items));
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setShowModal(false));

    useEffect(() => {
        getStoreItemsThunk();
    }, [dispatch]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);

        // If the search term is empty, close the modal and end here
        if (e.target.value === "") {
            setShowModal(false);
            setFilteredItems([]);
            return;
        }

        // Filter items based on search input
        const newFilteredItems = items.filter(item =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setFilteredItems(newFilteredItems);

        // Show the modal when there are search results
        if (newFilteredItems.length > 0) {
            setShowModal(true);
        }

        // Dispatch action to update search results in your Redux store
        dispatch(updateSearchResults(newFilteredItems));
    };

    return (
        <div>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onClick={() => searchTerm !== "" && setShowModal(true)} // Add this line
                />

            </div>
            {showModal && (
                <div className="search-results" ref={wrapperRef}>
                    {filteredItems.map(item => (
                        <div key={item.id} className="item">
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <img src={item.url} alt={item.name} />
                            </div>
                            <div className="item-add">
                                <AddToCartButton item={item} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
