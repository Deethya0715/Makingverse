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
    if (isSuccess) setPaperData(initialPaperState);
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Submit Research
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add a new paper to the Design & Engineering archive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Paper Title
            </label>
            <input
              name="title"
              type="text"
              required
              className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-black focus:bg-white focus:outline-none transition-all"
              placeholder="e.g. Sustainable Materials in Manufacturing"
              value={paperData.title}
              onChange={handleChange}
            />
          </div>

          {/* Grid for Year/Authors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Year
              </label>
              <input
                name="year"
                type="number"
                required
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-black focus:bg-white focus:outline-none transition-all"
                placeholder="2024"
                value={paperData.year}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Authors
              </label>
              <input
                name="authors"
                type="text"
                required
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-black focus:bg-white focus:outline-none transition-all"
                placeholder="J. Doe, A. Smith..."
                value={paperData.authors}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Direct Link
            </label>
            <input
              name="link"
              type="url"
              required
              className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-black focus:bg-white focus:outline-none transition-all"
              placeholder="https://"
              value={paperData.link}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-1/3 py-3 px-4 border border-gray-300 rounded-xl font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 py-3 px-4 rounded-xl font-bold text-white bg-black hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg"
            >
              {isLoading ? 'Processing...' : 'Submit Paper'}
            </button>
          </div>

          {/* Alerts */}
          {isSuccess && (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center font-medium border border-green-200">
              ✓ Paper published successfully!
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center font-medium border border-red-200">
              {error.message || "An error occurred."}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}