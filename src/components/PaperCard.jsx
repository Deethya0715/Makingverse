// PaperCard.jsx
import React from 'react';
import SchematicDiagram from './SchematicDiagram';
import { COLOR_BLUE_HEADER, COLOR_DOI, COLOR_PDF, COLOR_VIDEO } from '../constants/colors';

/**
 * Renders a single paper card.
 * @param {object} paper - The data for a single paper.
 * @param {function} onViewDetails - Function to open the modal (passed from Dashboard).
 */
const PaperCard = ({ paper, onViewDetails }) => {
    return (
        <div 
            className="flex-shrink-0 w-full md:w-[48%] lg:w-[48%] xl:w-[49%] p-6 bg-white rounded-xl shadow-2xl border border-gray-50 transition duration-300 ease-in-out flex flex-col justify-between hover:shadow-3xl hover:-translate-y-1"
        >
            <div>
                {/* Schematic Diagram */}
                <SchematicDiagram schematicSteps={paper.schematicSteps} />

                {/* Paper Title and Metadata Container */}
                <div className="mt-4">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-snug">
                        {paper.title}
                    </h3>
                    
                    <div className="paper-metadata text-sm text-gray-600 space-y-3">
                        {/* Authors */}
                        <p className="font-semibold text-gray-700">
                            By: <span className="font-normal text-gray-600">{paper.authors}</span>
                        </p>
                        
                        {/* Abstract - Increased line-clamp to show more content */}
                        <p className="line-clamp-6 italic text-gray-500">
                            {paper.abstract}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-6 border-t pt-4 border-gray-100">
                {/* Primary Button to Open Modal */}
                <button 
                    onClick={onViewDetails}
                    className="flex-grow sm:flex-grow-0 px-4 py-2 text-white text-sm font-extrabold rounded-full hover:shadow-xl hover:opacity-95 transition duration-200 shadow-md"
                    style={{ backgroundColor: COLOR_BLUE_HEADER }} 
                >
                    Read Full Details
                </button>

                {/* Secondary Buttons */}
                <button 
                    className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md"
                    style={{ backgroundColor: COLOR_DOI }} 
                >
                    DOI
                </button>
                
                <button 
                    className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md"
                    style={{ backgroundColor: COLOR_PDF }} 
                >
                    PDF
                </button>
                
                <button 
                    className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md"
                    style={{ backgroundColor: COLOR_VIDEO }} 
                >
                    Video
                </button>
            </div>
        </div>
    );
};

export default PaperCard;