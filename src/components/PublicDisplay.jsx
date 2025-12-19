import React, { useState } from 'react';
import PaperCard from './PaperCard';
import SearchBox from './SearchBox';
import { useFetchPapers } from '../hooks/useFetchPapers'; 
import { COLOR_BLUE_HEADER } from '../constants/colors';

// Added isAdmin and onAdminLogin props
const PublicDisplay = ({ isAdmin, onAdminLogin }) => {
    const { papers, loading } = useFetchPapers();
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (paper) => {
        setSelectedPaper(paper);
        setIsModalOpen(true);
    };

    const handleAdminClick = () => {
        const word = prompt("Enter the secret word to unlock admin features:");
        if (word) onAdminLogin(word);
    };

    if (loading) {
        return (
            <div className="min-h-screen font-sans text-gray-900 bg-beige-100 flex justify-center items-center">
                <h2 className="text-3xl font-bold text-sky-700">Loading All Papers...</h2>
            </div>
        );
    }

    if (papers.length === 0) {
         return (
            <div className="min-h-screen font-sans text-gray-900 bg-beige-100 flex justify-center items-center">
                <h2 className="text-3xl font-bold text-gray-600">No papers found in the database.</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans text-gray-900 bg-beige-100 flex flex-col"> 
            <header className="hero-bg hero-section hero-container w-full">
                <div className="text-center">
                    <div className="hero-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 tracking-tight leading-tight text-gray-900 hero-title"
                            style={{ color: COLOR_BLUE_HEADER || '#3b3b3b' }}
                        >
                            Innovating the Future of <br /> Human-Computer Interaction
                        </h1>
                        <p className="hero-sub max-w-4xl text-sm sm:text-base font-light mb-8">
                            Exploring the symbiotic relationship between humans and technology to create intuitive, effective, and empowering digital experiences.
                        </p>
                        <div className="block"> 
                            <SearchBox />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto pt-6 pb-20 px-4 sm:px-6 lg:px-8 w-full flex-grow">
                <section id="featured">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Publications ({papers.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch place-items-center">
                        {papers.map((p) => (
                            <PaperCard key={p.id} paper={p} onViewDetails={() => openModal(p)} />
                        ))}
                    </div>
                </section>
            </main>

            <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-gray-900 mt-auto">
                <p>© {new Date().getFullYear()} HCI Research Group. All rights reserved.</p>
                {/* Hidden Admin Trigger */}
                {!isAdmin && (
                    <button 
                        onClick={handleAdminClick}
                        className="mt-4 text-[10px] text-gray-600 hover:text-gray-400 transition"
                    >
                        Admin Access
                    </button>
                )}
            </footer>
        </div>
    );
};

export default PublicDisplay;