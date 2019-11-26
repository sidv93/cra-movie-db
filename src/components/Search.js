import React, { useState } from 'react';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleTextInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue('');
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input 
                value={searchValue}
                onChange={handleTextInputChanges}
                type="text"
            />
            <input
                type="submit"
                value="SEARCH"
                onClick={callSearchFunction}
            />
        </form>
    )
}

export default Search;
