import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input);
            setInput("");
        }
    };

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search city..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <i class="fas fa-search"></i>
        </form>
    );
};

export default SearchBar;
