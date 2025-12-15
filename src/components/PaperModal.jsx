import React from 'react';
import SchematicDiagram from './SchematicDiagram';
import {
    COLOR_BLUE_HEADER,
    COLOR_DOI,
    COLOR_PDF,
    COLOR_VIDEO,
    COLOR_MODAL,
} from '../constants/colors';

/**
 * Renders the full details of a paper in a modal.
 */
const PaperModal = ({ paper, onClose, isOpen = false }) => {
    if (!paper || !isOpen) return null;

    const handleBackdropClick = (e) => {
        // Ensure click is only on the backdrop itself
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDOIClick = () => {
        if (paper.doi) {
            window.open(`https://doi.org/${paper.doi}`, '_blank');
        }
    };

    return (
        // OVERLAY: 'fixed inset-0' for full screen. 'flex items-center justify-center' for centering.
        // Use 'p-4' instead of 'overflow-y-auto' on the overlay for better containment.
        <div 
            className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            {/* MODAL PANEL:
                1. 'relative' is crucial when using the flex centering method.
                2. 'overflow-y-auto' moves to the modal panel itself, allowing internal scrolling.
                3. 'max-h-[90vh]' limits height to prevent overflow outside the screen.
            */}
            <div 
                className="relative rounded-xl shadow-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
                onClick={e => e.stopPropagation()}
                style={{ backgroundColor: COLOR_MODAL }}
            >
                {/* Modal Header */}
                <div className="sticky top-0 z-10 p-6 border-b border-gray-100 flex justify-between items-start" 
                    style={{ backgroundColor: COLOR_BLUE_HEADER, borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                    <h2 className="text-xl font-extrabold text-white leading-snug pr-4">
                        {paper.title}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-white hover:text-gray-300 transition duration-150 p-1 -mt-2 -mr-2"
                        aria-label="Close modal"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    {/* Metadata Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-gray-700 border-b pb-4">
                        <p>
                            <span className="font-bold text-gray-900">Authors:</span> {paper.authors}
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">Publication:</span> {paper.publication}
                        </p>
                        <p className="col-span-1 sm:col-span-2">
                            <span className="font-bold text-gray-900">DOI:</span> {paper.doi}
                        </p>
                    </div>

                    {/* Full Abstract/Description */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">Full Abstract</h3>
                        
                        {/* Image sections omitted for brevity/placeholder */}

                        <p className="text-gray-700 italic border-l-4 border-gray-200 pl-4">
                            {paper.abstract}
                        </p>
                        <p className="text-gray-700">
                            {paper.fullDescription}
                        </p>
                    </div>

                    {/* Schematic Diagram */}
                    {paper.schematicSteps && paper.schematicSteps.length > 0 && (
                        <SchematicDiagram schematicSteps={paper.schematicSteps} isModal={true} />
                    )}
                </div>

                {/* Modal Footer - Action Buttons (Sticky at the bottom of the modal content) */}
                {/* Note: If the footer needs to be sticky at the bottom of the viewport, more complex positioning is needed, 
                   but usually, it should be sticky to the bottom of the *modal content*. */}
                <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3 justify-end">
                    {/* DOI Button */}
                    <button 
                        onClick={handleDOIClick}
                        className="px-5 py-2 text-white text-sm font-bold rounded-lg hover:opacity-90 transition duration-150 shadow-lg"
                        style={{ backgroundColor: COLOR_DOI }} 
                    >
                        Go to DOI
                    </button>
                    
                    {/* View Paper Button (Primary Action) */}
                    <button 
                        className="px-5 py-2 text-white text-sm font-bold rounded-lg hover:opacity-90 transition duration-150 shadow-lg"
                        style={{ backgroundColor: COLOR_PDF }} 
                    >
                        View Full Paper (PDF)
                    </button>

                    {/* Video Button - conditionally rendered */}
                    {paper.videoUrl && (
                        <button 
                            className="px-5 py-2 text-white text-sm font-bold rounded-lg hover:opacity-90 transition duration-150 shadow-lg"
                            style={{ backgroundColor: COLOR_VIDEO }} 
                            onClick={() => window.open(paper.videoUrl, '_blank')}
                        >
                            Video
                        </button>
                    )}

                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="px-5 py-2 text-gray-700 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaperModal;