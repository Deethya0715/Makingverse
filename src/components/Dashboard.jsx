// Dashboard.jsx
import React, { useState } from 'react';
import PaperCard from './PaperCard'; 
import PaperModal from './PaperModal';
import { COLOR_PRIMARY, COLOR_BLUE_HEADER } from '../constants/colors';

// --- MOCK DATA FOR DEMONSTRATION (fallback) ---
const mockPapers = [
  {
    id: 1,
    title: "Virtual Body Swapping: A VR-Based Approach to Embodied Third-Person Self-Processing in Mind-Body Therapy",
    authors: "Maria Zöllinger, David Moll, Sebastian Keppler, Erik Motl, Mario Bitschnau, Johann Habatnik, Sebastian Steiner, Lutz Frisch, Carolin Wienrich",
    abstract: "Virtual reality (VR) offers various opportunities for innovative therapeutic approaches, especially regarding embodiment and self-perception. In this work, we present a VR-based system that offers users a third-person perspective and appearance and evaluate its effects on virtual sense of embodiment (SoE) and self-compassion. The study involved a controlled experiment where participants embodied their personalized, photorealistic avatar, swapped bodies with an unfamiliar peer, and participated in either a self-compassion or control scenario. The results show that embodying a personalized avatar compared to swapping with a peer leads to higher SoE. Furthermore, the self-compassion scenario led to an increased self-compassion score, while the control scenario had a non-significant effect. These findings suggest that embodying a third-person perspective and personalized appearance can be a powerful tool for self-compassion in mind-body therapy. We provide design and implementation recommendations for future research on avatar-based mind-body interventions.",
    fullDescription: "This research delves into the psychological and therapeutic applications of Virtual Reality, specifically focusing on how shifting one's visual self-perception to a third-person perspective can influence self-compassion. The system's novelty lies in its personalized, photorealistic avatar generation, aiming to maximize the 'Sense of Embodiment' (SoE). The controlled study design rigorously compares the effects of embodying one's own avatar versus a peer's avatar, providing empirical evidence for VR's potential as a mind-body intervention tool. Key findings indicate that the combination of third-person perspective and a self-personalized avatar significantly enhances both SoE and self-compassion scores, opening new avenues for clinical VR applications.",
    schematicSteps: [],
    doi: '10.1145/1234567.890123',
    publication: 'ACM CHI Conference 2024'
  },
  {
    id: 2,
    title: "Understanding User Experience in Mixed Reality with Gaze Tracking: A Review",
    authors: "Jane Doe, John Smith, Alice Brown",
    abstract: "Mixed Reality (MR) systems, combining physical and virtual worlds, present unique challenges and opportunities for user experience (UX) research. This review systematically analyzes the application of gaze tracking technology to evaluate UX in MR environments. We classify existing research into four major themes: attention allocation, cognitive load assessment, interaction analysis, and usability testing. Our findings highlight the effectiveness of gaze tracking in providing objective, non-intrusive data on user behavior, but also point to the need for standardized metrics and better tools for data interpretation in complex, multi-modal environments. Future work should focus on integrating gaze data with physiological and subjective measures for a holistic understanding of MR UX. This paper serves as a foundational guide for researchers and developers in the emerging field of spatial computing.",
    fullDescription: "The systematic review synthesizes over a decade of research on the integration of gaze tracking as a primary UX metric in Mixed Reality. The paper meticulously categorizes the utility of eye-tracking data—from basic heatmaps for attention to complex saccadic patterns for cognitive load. It discusses the methodological pitfalls, such as the vergence-accommodation conflict in near-field MR, and proposes a framework for future research to develop standardized, open-source tools for MR gaze data analysis. This review is essential reading for any practitioner or researcher working on the design and evaluation of head-mounted displays.",
    schematicSteps: [
        { label: 'Start Tracking', hasMirror: false },
        { label: 'Calibrate Eye', hasMirror: false },
        { label: 'Interact', hasMirror: true },
        { label: 'Record Data', hasMirror: false },
    ],
    doi: '10.1145/2233445.678901',
    publication: 'IEEE VR Conference 2023'
  }
];
// --- END MOCK DATA ---

/**
 * The main Dashboard component using the light background color F0E4D4.
 */
const Dashboard = ({ papers = [] }) => {
  // Use the papers prop from Firebase, fall back to mock data if empty
  const displayPapers = papers && papers.length > 0 ? papers : mockPapers;
  
  // State for modal management
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (paper) => {
    setSelectedPaper(paper);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPaper(null);
  };

  return (
    <div 
      className="min-h-screen font-sans text-gray-800"
      // Using a light off-white background
      style={{ backgroundColor: '#F9FAFB' }} 
    > 
      
      {/* 2. Main Content Area */}
      <main className="max-w-7xl mx-auto pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* 2.1. Central Text Block (Hero Section) */}
        <section className="text-center mb-16">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tighter"
            // Using a modern Indigo color for a clean header
            style={{ color: COLOR_BLUE_HEADER || '#4F46E5' }} 
          >
            Innovating the Future of HCI
          </h1>
          <p className="max-w-4xl mx-auto text-gray-600 text-xl font-light">
            Exploring the <strong>symbolic relationship</strong> between humans and technology to create intuitive, effective, and empowering digital experiences.
          </p>
        </section>

        {/* 2.2. Search Bar - Polished Look */}
        <div className="flex justify-center mb-20">
          <div className="w-full max-w-3xl relative">
            <input 
              type="search" 
              placeholder="Search by author, paper, or topic..." 
              className="w-full p-4 pl-12 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-lg transition duration-200 search-input"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' viewBox='0 0 24 24' stroke-width='1.5' stroke='%236B7280' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Ccircle cx='10' cy='10' r='7'/%3E%3Cline x1='21' y1='21' x2='15' y2='15'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '1rem center',
                backgroundSize: '1.5rem'
              }}
            />
          </div>
        </div>

        {/* 2.3. Papers Grid - Enhanced Header */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-10 border-b border-indigo-200 pb-3">
            Featured Publications <span className="text-xl font-normal text-gray-500">({displayPapers.length} Total)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPapers.length > 0 ? (
              displayPapers.map(p => (
                <PaperCard 
                  key={p.id || p._id} 
                  paper={p} 
                  onViewDetails={() => openModal(p)} 
                />
              ))
            ) : (
              <div className="w-full text-center text-gray-500 p-10 bg-black rounded-xl shadow-md col-span-full">
                No papers to display.
              </div>
            )}
          </div>
        </section>
        
        {/* Paper Modal rendered outside the grid */}
        <PaperModal 
          paper={selectedPaper} 
          onClose={closeModal} 
          isOpen={isModalOpen}
        />

      </main>
      
      {/* 3. Footer */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-gray-900 mt-auto">
        <p>© {new Date().getFullYear()} HCI Research Group. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;