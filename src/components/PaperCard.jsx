// PaperCard.jsx
import React from 'react';
import SchematicDiagram from './SchematicDiagram';
import { COLOR_BLUE_HEADER, COLOR_DOI, COLOR_PDF, COLOR_VIDEO, COLOR_PAGE } from '../constants/colors';

/**
 * Renders a single paper card.
 * @param {object} paper - The data for a single paper.
 * @param {function} onViewDetails - Function to open the modal (passed from Dashboard).
 */
const PaperCard = ({ paper, onViewDetails }) => {
	const images = paper.images || [];
	return (
		<div
			className="paper-card w-full p-6 bg-white rounded-xl border border-gray-100 transition duration-300 ease-in-out flex flex-col justify-between hover:shadow-2xl hover:-translate-y-0.5 text-center"
		>
			<div>
				{/* Image Gallery (if any), else Schematic Diagram */}
				{images.length > 0 ? (
					<div className="flex items-center space-x-3 overflow-x-auto pb-4">
						{images.map((imgUrl, idx) => (
							<img
								key={idx}
								src={imgUrl}
								alt={`thumb-${idx}`}
								className="h-32 w-24 object-cover rounded-md border border-gray-100 shadow-sm"
							/>
						))}
					</div>
				) : (
					<SchematicDiagram schematicSteps={paper.schematicSteps} />
				)}

				{/* Paper Title and Metadata Container */}
				<div className="mt-4">
					<h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-snug text-center">
						{paper.title}
					</h3>

					<div className="paper-metadata text-sm text-gray-600 space-y-3">
						{/* Authors */}
						<p className="font-semibold text-gray-700 text-center">
							By: <span className="font-normal text-gray-600">{paper.authors}</span>
						</p>

						{/* Abstract - Increased line-clamp to show more content */}
						<p className="line-clamp-6 italic text-gray-500 text-center">
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
					style={{ backgroundColor: COLOR_PAGE }}
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