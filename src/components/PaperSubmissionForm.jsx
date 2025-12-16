// src/components/PaperSubmissionForm.jsx

import React, { useState, useEffect } from 'react';
// Note: Assuming you fixed the export in your hook to be 'default' or adjust the import below
import { usePaperSubmit } from '../hooks/usePaperSubmit'; 

// Define initial state once for easy reuse
const initialPaperState = { title: '', authors: '', year: '', link: '' };

export default function PaperSubmissionForm() {
  // Combine state into a single object for simpler management
  const [paperData, setPaperData] = useState(initialPaperState);

  // 1. REVISED HOOK INTEGRATION: The hook takes NO arguments here
  const { submitPaper, isLoading, error, isSuccess } = usePaperSubmit(); 

  // Handle input changes by updating the single state object
  const handleChange = (e) => {
    setPaperData({ ...paperData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 2. REVISED SUBMISSION: Pass the data when calling submitPaper
    await submitPaper(paperData); 
  };

  // 3. CLEAR FORM FIX: Use useEffect to watch the hook's success state
  useEffect(() => {
    if (isSuccess) {
      setPaperData(initialPaperState); // Clear the form
    }
  }, [isSuccess]); // Rerun only when isSuccess changes

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">➕ Submit a Paper</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={paperData.title}
            onChange={handleChange}
            type="text"
            name="title" // <-- CRITICAL: Added name attribute
            required
            placeholder="Paper title"
          />
        </div>

        {/* Authors Input */}
        <div>
          <label className="block text-sm font-medium">Authors</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={paperData.authors}
            onChange={handleChange}
            type="text"
            name="authors" // <-- CRITICAL: Added name attribute
            required
            placeholder="Author names (comma-separated)"
          />
        </div>
        
        {/* Year Input */}
        <div>
          <label className="block text-sm font-medium">Year</label>
          <input
            className="mt-1 block w-32 border rounded px-3 py-2"
            value={paperData.year}
            onChange={handleChange}
            type="number"
            name="year" // <-- CRITICAL: Added name attribute
            required
            placeholder="2025"
          />
        </div>

        {/* Link Input */}
        <div>
          <label className="block text-sm font-medium">Link</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={paperData.link}
            onChange={handleChange}
            type="url"
            name="link" // <-- CRITICAL: Added name attribute
            required
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-60 hover:bg-sky-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Paper'}
          </button>

          {isSuccess && <div className="text-green-600">Submitted successfully!</div>}
          {error && <div className="text-red-600 font-medium">Error submitting: {error.message || error}</div>}
        </div>
      </form>
    </div>
  );
}