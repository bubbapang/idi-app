import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentStore } from "../../store/currentStore";
import "./StoreShow.css";

export default function StoreShow({ store }) {
	const dispatch = useDispatch();
	const { id, name, url } = store;

	// write a function that handles the click of a store
	function handleClick(store) {
		console.log("store", store);
		dispatch(setCurrentStore(store));
	}

	return (
		<div className="store-show" onClick={() => handleClick(store)}>
			<Link to={`/store/${id}`}>
				<img src={url} alt={name} />
			</Link>
			<h4>{name}</h4>
		</div>
	);
}
