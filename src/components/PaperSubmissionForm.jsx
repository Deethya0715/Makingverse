import React, { useState } from 'react';
import usePaperSubmit from '../hooks/usePaperSubmit';

export default function PaperSubmissionForm() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
  const [link, setLink] = useState('');

  const paperData = { title, authors, year, link };
  const { submitPaper, isLoading, error, success } = usePaperSubmit(paperData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submitPaper();
    if (ok) {
      // clear form on success
      setTitle('');
      setAuthors('');
      setYear('');
      setLink('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Submit a Paper</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            placeholder="Paper title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Authors</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            type="text"
            required
            placeholder="Author names (comma-separated)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Year</label>
          <input
            className="mt-1 block w-32 border rounded px-3 py-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            required
            placeholder="2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Link</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="url"
            required
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Paper'}
          </button>

          {success && <div className="text-green-600">Submitted successfully.</div>}
          {error && <div className="text-red-600">{error}</div>}
        </div>
      </form>
    </div>
  );
}
