import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaperSubmit } from '../hooks/usePaperSubmit'; 

const initialPaperState = { title: '', authors: '', year: '', link: '' };

export default function PaperSubmissionForm() {
  const [paperData, setPaperData] = useState(initialPaperState);
  const navigate = useNavigate();
  const { submitPaper, isLoading, error, isSuccess } = usePaperSubmit(); 

  const handleChange = (e) => {
    setPaperData({ ...paperData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPaper(paperData); 
  };

  useEffect(() => {
    if (isSuccess) {
      setPaperData(initialPaperState);
    }
  }, [isSuccess]);

  return (
    <div className="max-w-xl mx-auto p-10 mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
        
        {/* Paper Title */}
        <div className="flex flex-col">
          <label className="text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">Paper Title</label>
          <input
            className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 transition-all placeholder-gray-500"
            value={paperData.title}
            onChange={handleChange}
            name="title"
            required
            placeholder="Enter title"
          />
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">Publication Year</label>
          <input
            className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 transition-all placeholder-gray-500"
            value={paperData.year}
            onChange={handleChange}
            type="number"
            name="year"
            required
            placeholder="Year"
          />
        </div>

        {/* Authors */}
        <div className="flex flex-col">
          <label className="text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">Authors</label>
          <input
            className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 transition-all placeholder-gray-500"
            value={paperData.authors}
            onChange={handleChange}
            name="authors"
            required
            placeholder="Enter authors"
          />
        </div>

        {/* Link */}
        <div className="flex flex-col">
          <label className="text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">Paper Link</label>
          <input
            className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 transition-all placeholder-gray-500"
            value={paperData.link}
            onChange={handleChange}
            type="url"
            name="link"
            required
            placeholder="https://"
          />
        </div>

        <p className="text-gray-600 text-center font-medium italic">
          Verify all details before submitting.
        </p>

        {/* FIXED BUTTONS SECTION */}
        <div className="flex items-center justify-center gap-6 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-8 py-4 !bg-gray-200 !text-black border-2 border-black rounded-xl font-bold uppercase tracking-tight hover:!bg-gray-300 transition-all shadow-sm"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-8 py-4 !bg-black !text-white border-2 border-black rounded-xl font-bold uppercase tracking-tight hover:!bg-gray-800 transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? 'Wait...' : 'Submit'}
          </button>
        </div>

        {/* Status Messages */}
        {isSuccess && (
          <div className="bg-black text-green-400 p-4 rounded-lg text-center font-bold border border-green-900 mt-4">
            ✓ PAPER PUBLISHED SUCCESSFULLY
          </div>
        )}
        {error && (
          <div className="bg-black text-red-500 p-4 rounded-lg text-center font-bold border border-red-900 mt-4">
            ERROR: {error.message || error}
          </div>
        )}
      </form>
    </div>
  );
}