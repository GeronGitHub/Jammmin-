import React from 'react';
import { useState } from 'react';

function SearchBar({ onSearch}){
    const [term, setTerm] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if (term.trim()){
            onSearch(term);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                value={term} 
                placeholder='Enter a song or artist...'
                onChange={(e) => setTerm(e.target.value)} 
            />
            <button type="submit">SEARCH</button>
        </form>
 
    );
}

export default SearchBar;