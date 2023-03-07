import React from 'react'
import './Navigation.css'

export default function Searchbar() {
    return (
        <div className="searchbar">
            <input type="text" placeholder="Search" />
            <button type="submit"><i className="fas fa-search"></i></button>
        </div>
    )
}