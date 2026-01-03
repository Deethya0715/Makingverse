import React, { useState, useEffect } from 'react';

const AdvancedFilters = ({ onFilterChange }) => {
  // Local state to manage the inputs immediately as user types
  const [localFilters, setLocalFilters] = useState({
    title: '',
    author: '',
    keyword: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Debounce: Wait 300ms after typing stops before sending data to the parent
  // This prevents the app from lagging while you type fast
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onFilterChange(localFilters);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [localFilters, onFilterChange]);

  return (
    <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 mt-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Title Input */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={localFilters.title}
            onChange={handleChange}
            placeholder="Search titles..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Author Input */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={localFilters.author}
            onChange={handleChange}
            placeholder="Find an author..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Keyword Input */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            Keyword
          </label>
          <input
            type="text"
            name="keyword"
            value={localFilters.keyword}
            onChange={handleChange}
            placeholder="Filter by topic..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
          />
        </div>

      </div>
      
      {/* Clear Filters Button (Optional: Only shows if something is typed) */}
      {(localFilters.title || localFilters.author || localFilters.keyword) && (
        <div className="mt-3 text-right">
          <button
            onClick={() => setLocalFilters({ title: '', author: '', keyword: '' })}
            className="text-xs text-red-500 hover:text-red-700 font-medium underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;