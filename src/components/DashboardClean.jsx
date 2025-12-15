import React, { useState } from 'react';
import PaperCard from './PaperCard';
import PaperModal from './PaperModal';
import SearchBox from './SearchBox';
import { COLOR_BLUE_HEADER } from '../constants/colors';

const mockPapers = [
  {
    id: 1,
    title: 'Virtual Body Swapping: A VR-Based Approach to Embodied Third-Person Self-Processing',
    authors: 'Maria Zöllinger, David Moll, Sebastian Keppler',
    images: ['https://via.placeholder.com/200x320/efe6dc/cc9b7f'],
    abstract: 'A study on VR avatar embodiment and self-compassion outcomes.',
  },
  {
    id: 2,
    title: 'Understanding User Experience in Mixed Reality with Gaze Tracking',
    authors: 'Jane Doe, John Smith',
    images: ['https://via.placeholder.com/200x320/e9f8f7/84c7c2'],
    abstract: 'A review of gaze tracking methods for MR user experience research.',
  },
];

const Dashboard = ({ papers = [] }) => {
  const displayPapers = papers && papers.length > 0 ? papers : mockPapers;

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
    // ROOT: flex flex-col for full height and sticky footer
    <div className="min-h-screen font-sans text-gray-900 bg-beige-100 flex flex-col"> 
      
      {/* HEADER: mx-auto on inner div centers hero content */}
      <header className="hero-bg hero-section hero-container w-full">
        <div className="text-center">
          <div className="hero-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 tracking-tight leading-tight text-gray-900 hero-title"
              style={{ color: COLOR_BLUE_HEADER || '#3b3b3b' }}
            >
              Innovating the Future of
              <br />
              Human-Computer Interaction
            </h1>
            <p className="hero-sub max-w-4xl text-sm sm:text-base font-light mb-8">
              Exploring the symbiotic relationship between humans and technology to create intuitive, effective, and empowering digital experiences.
            </p>

            {/* FIX: Remove the 'flex justify-center' wrapper to prevent interference.
                Rely on the 'mx-auto' within the SearchBox component's wrapper.
                Since the parent has text-align: center, setting the container to 
                be 'block' will center it naturally.
            */}
            <div className="block"> 
            <SearchBox />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN: max-w-7xl mx-auto centers the main content block. */}
      <main className="max-w-7xl mx-auto pt-6 pb-20 px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <section id="featured">
          {/* REMOVED INNER DIV: Centering is handled by the parent <main> tag */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Publications</h2>

          {/* GRID: place-items-center centers each card within its grid column. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch place-items-center">
            {displayPapers.map((p) => (
              <PaperCard key={p.id || p._id} paper={p} onViewDetails={() => openModal(p)} />
            ))}
          </div>
        </section>

        <PaperModal paper={selectedPaper} onClose={closeModal} isOpen={isModalOpen} />
      </main>

      {/* Footer: mt-auto ensures it sticks to the bottom */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-gray-900 mt-auto">
        <p>© {new Date().getFullYear()} HCI Research Group. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;