import React, { useState, useRef } from 'react';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const refInput = useRef(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto">

      <input
        ref={refInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        aria-label="Search papers"
        placeholder="Search by title, author, or keyword..."
        className="w-full p-3 pl-20 pr-16 rounded-full text-sm sm:text-base transition duration-200 search-input hero-search"
      />

      {query && (
        <button
          type="button"
          className="hero-search-clear"
          aria-label="Clear search"
          onClick={() => {
            setQuery('');
            if (refInput.current) refInput.current.focus();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}