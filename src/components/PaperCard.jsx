import React from 'react';
import SchematicDiagram from './SchematicDiagram';
import { COLOR_DOI, COLOR_PDF, COLOR_VIDEO } from '../constants/colors';

/**
 * Renders a single paper card with a custom background color.
 * @param {object} paper - The data for a single paper.
 */
const PaperCard = ({ paper, onViewDetails }) => {
    // Correctly mapping keys based on your database JSON structure
    const title = paper.Title || paper.title;
    const abstract = paper.Abstract || paper.abstract;
    const authors = paper["Author List"] || paper.authors;
    const doiUrl = paper.DOI || paper.doi;
    
    // Updated to include "link" fallback from your JSON
    const pdfUrl = paper.PDF || paper.pdf || paper.link;

    // Updated to include the "Video (if)" key seen in your screenshot
    const videoUrl = paper.Video || paper.video || paper["Video (if)"];
    
    const images = paper.images || (paper.Picture ? [paper.Picture] : []);

    const openLink = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            alert("Link not available");
        }
    };

    return (
        <div
            className="paper-card w-full p-6 rounded-xl border border-gray-600/20 transition duration-300 ease-in-out flex flex-col justify-between hover:shadow-2xl hover:-translate-y-0.5 text-center"
            style={{ backgroundColor: '#dcc1a6' }} 
        >
            <div>
                {/* Image Gallery or Schematic */}
                {images.length > 0 && images[0] !== "" ? (
                    <div className="flex items-center space-x-3 overflow-x-auto pb-4">
                        {images.map((imgUrl, idx) => (
                            <img
                                key={idx}
                                src={imgUrl}
                                alt={`thumb-${idx}`}
                                className="h-32 w-24 object-cover rounded-md border border-black/10 shadow-sm"
                            />
                        ))}
                    </div>
                ) : (
                    <SchematicDiagram schematicSteps={paper.schematicSteps} />
                )}

                {/* Content Area */}
                <div className="mt-4 p-2">
                    <h3 className="text-lg font-extrabold text-white mb-2 leading-snug text-center">
                        {title}
                    </h3>

                    <div className="paper-metadata text-sm space-y-3">
                        <p className="font-semibold text-gray-100 text-center">
                            By: <span className="font-normal text-white/90">{authors}</span>
                        </p>

                        <p className="line-clamp-6 italic text-white/80 text-center">
                            {abstract}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-6 border-t pt-4 border-white/20">
                <button
                    onClick={() => openLink(doiUrl)}
                    className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md flex-1"
                    style={{ backgroundColor: COLOR_DOI }}
                >
                    DOI
                </button>

                <button
                    onClick={() => openLink(pdfUrl)}
                    className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md flex-1"
                    style={{ backgroundColor: COLOR_PDF }}
                >
                    PDF
                </button>

                {/* This will now show because videoUrl correctly picks up "Video (if)" */}
                {videoUrl && (
                    <button
                        onClick={() => openLink(videoUrl)}
                        className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md flex-1"
                        style={{ backgroundColor: COLOR_VIDEO }}
                    >
                        Video
                    </button>
                )}
            </div>
        </div>
    );
};

export default PaperCard;