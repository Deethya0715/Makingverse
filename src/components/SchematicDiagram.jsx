// SchematicDiagram.jsx
import React from 'react';

/**
 * Renders the schematic visualization of a paper's method steps.
 * @param {Array<object>} schematicSteps - The steps for the visualization.
 * @param {boolean} isModal - Whether this is displayed in a modal (changes styling).
 */
const SchematicDiagram = ({ schematicSteps = [], isModal = false }) => {
	if (!schematicSteps || schematicSteps.length === 0) return null;

	return (
		<div className={`py-4 ${isModal ? 'border-gray-200' : 'border-b border-gray-100'}`}>
			<h4 className={`text-sm font-bold mb-3 ${isModal ? 'text-gray-800' : 'text-gray-600'}`}>
				Methodology Schematic
			</h4>
			<div className="flex items-end space-x-1 justify-between">
				{schematicSteps.map((item, index) => (
					<React.Fragment key={index}>
						{/* Diagram Step */}
						<div className="flex flex-col items-center flex-1 min-w-0">
							{/* Box Placeholder for Figure */}
							<div
								className={`h-12 w-8 border border-gray-400 bg-gray-50 mb-2 rounded-sm shadow-sm ${item.hasMirror ? 'relative' : ''} ${isModal ? 'h-16 w-12' : ''}`}
							>
								{/* Placeholder for the mirrored figure */}
								{item.hasMirror && (
									<div
										className={`absolute top-0 right-0 border border-gray-400 transform translate-x-10 rounded-sm ${isModal ? 'h-16 w-12' : 'h-12 w-8'}`}
										style={{ backgroundColor: '#e5e7eb' }}
									></div>
								)}
							</div>
							<p className={`text-xs text-gray-700 font-medium text-center leading-tight ${isModal ? 'text-sm' : ''}`}>
								{item.label}
							</p>
						</div>

						{/* Arrow between steps (except for last step) */}
						{index < schematicSteps.length - 1 && (
							<div className="flex-1 h-0.5 bg-gray-300 mb-6"></div>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default SchematicDiagram;