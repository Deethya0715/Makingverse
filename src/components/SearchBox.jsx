import React, { useState, useRef, useEffect } from 'react';

// Accept an 'onSearch' prop from the parent
export default function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');
  const refInput = useRef(null);

  // Debounce logic: Only trigger the search 300ms after the user stops typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Send the query up to the parent component
      if (onSearch) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

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
            // Focus back on input after clearing
            if (refInput.current) refInput.current.focus();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}