import React from 'react';
import SchematicDiagram from './SchematicDiagram';
import { COLOR_DOI, COLOR_PDF, COLOR_VIDEO } from '../constants/colors';

const PaperCard = ({ paper, onViewDetails }) => {
    // 1. Metadata mapping
    const title = paper.Title || paper.title;
    const abstract = paper.Abstract || paper.abstract;
    const authors = paper["Author List"] || paper.authors || paper.By;
    const images = paper.images || (paper.Picture ? [paper.Picture] : []);

    // 2. REFINE LINK DISCOVERY
    // This helper checks if a key exists AND if the value is a real link (not empty)
    const getValidUrl = (possibleKeys) => {
        // First, check the specific keys you've mentioned
        for (const key of possibleKeys) {
            if (paper[key] && String(paper[key]).trim() !== "") {
                return paper[key];
            }
        }
        
        // Second, fallback to a "fuzzy" search if the specific keys aren't found
        const fuzzyKey = Object.keys(paper).find(k => 
            k.toLowerCase().includes('video') || 
            k.toLowerCase().includes('movie') || 
            k.toLowerCase().includes('youtube')
        );
        
        return fuzzyKey && String(paper[fuzzyKey]).trim() !== "" ? paper[fuzzyKey] : null;
    };

    // Prefer normalized fields (from transformData) but fall back to fuzzy lookup
    const videoUrl = paper.video || getValidUrl(["Video (if)", "Video", "video", "Video Link"]);
    const doiUrl = paper.doi || getValidUrl(["DOI", "doi", "Doi"]);
    const pdfUrl = paper.pdf || paper.link || getValidUrl(["PDF", "pdf", "link", "Link"]);

    // DEBUGGING: Remove this once you see the buttons
    console.log(`Paper: ${title}`, {
        allKeys: Object.keys(paper),
        foundVideoProp: paper.video,
        foundVideo: videoUrl
    });

    const openLink = (url) => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className="paper-card w-full p-6 rounded-xl border border-gray-600/20 transition duration-300 ease-in-out flex flex-col justify-between hover:shadow-2xl hover:-translate-y-0.5 text-center"
            style={{ backgroundColor: '#dcc1a6' }} 
        >
            <div>
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

            {/* Action Buttons - Only render if URL is valid */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-6 border-t pt-4 border-white/20">
                {doiUrl && (
                    <button
                        onClick={() => openLink(doiUrl)}
                        className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md flex-1"
                        style={{ backgroundColor: COLOR_DOI }}
                    >
                        DOI
                    </button>
                )}

                {pdfUrl && (
                    <button
                        onClick={() => openLink(pdfUrl)}
                        className="px-4 py-2 text-white text-xs font-bold rounded-full hover:opacity-90 transition duration-150 shadow-md flex-1"
                        style={{ backgroundColor: COLOR_PDF }}
                    >
                        PDF
                    </button>
                )}

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