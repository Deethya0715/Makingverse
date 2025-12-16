// src/components/PublicDisplay.jsx (Example Integration)

import React from 'react';
import { useFetchPapers } from '../hooks/useFetchPapers';

const PublicDisplay = () => {
    const { papers, loading } = useFetchPapers();

    if (loading) {
        return <div className="text-center p-10">Loading research papers...</div>;
    }

    if (papers.length === 0) {
        return <div className="text-center p-10">No papers have been submitted yet.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">🔬 Available Research Papers</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {papers.map((paper) => (
                    // Display each paper as a card
                    <div key={paper.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold text-sky-700 mb-2">{paper.title}</h3>
                        <p className="text-gray-600">
                            <strong>Authors:</strong> {paper.authors}
                        </p>
                        <p className="text-gray-600">
                            <strong>Year:</strong> {paper.year}
                        </p>
                        <a 
                            href={paper.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-3 inline-block text-sm text-sky-600 hover:text-sky-800 font-medium"
                        >
                            Read Full Paper &rarr;
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublicDisplay;