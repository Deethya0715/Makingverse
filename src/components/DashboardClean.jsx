import React, { useState } from 'react';
import PaperCard from './PaperCard';
import PaperModal from './PaperModal';
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
    <div className="min-h-screen font-sans text-gray-900 bg-beige-100">
      <main className="max-w-7xl mx-auto pt-6 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="hero-bg hero-section hero-container">
          <div className="text-left">
            <div className="hero-inner max-w-6xl mx-0 px-4 lg:px-0">
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

              <div className="flex justify-start">
                <div className="w-full hero-search-wrapper">
                  <input
                    type="search"
                    placeholder="Search by title, author, or keyword..."
                    className="w-full p-3 pl-12 rounded-full text-sm sm:text-base transition duration-200 search-input hero-search"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayPapers.map((p) => (
              <PaperCard key={p.id || p._id} paper={p} onViewDetails={() => openModal(p)} />
            ))}
          </div>
        </section>

        <PaperModal paper={selectedPaper} onClose={closeModal} isOpen={isModalOpen} />
      </main>

      <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-gray-900 mt-auto">
        <p>© {new Date().getFullYear()} HCI Research Group. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
