import React, { useState } from 'react';
import PaperCard from './PaperCard';
import AdvancedFilters from './AdvancedFilters'; // <--- IMPORT NEW COMPONENT
import { useFetchPapers } from '../hooks/useFetchPapers'; 
import { useAdvancedFilter } from '../hooks/useAdvancedFilter'; // <--- IMPORT NEW HOOK
import { COLOR_BLUE_HEADER } from '../constants/colors';

const PublicDisplay = ({ isAdmin, onAdminLogin }) => {
    const { papers, loading } = useFetchPapers();
    
    // <--- NEW STATE FOR FILTERS --->
    const [filterCriteria, setFilterCriteria] = useState({ title: '', author: '', keyword: '' });
    
    // <--- USE THE FILTER HOOK --->
    const filteredPapers = useAdvancedFilter(papers, filterCriteria);

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

    // Optional: Only show "No papers" if the database is actually empty, 
    // not just if a search returns 0 results.
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
                        
                        {/* <--- REPLACED SEARCHBOX WITH ADVANCED FILTERS ---> */}
                        <div className="block"> 
                            <AdvancedFilters onFilterChange={setFilterCriteria} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto pt-6 pb-20 px-4 sm:px-6 lg:px-8 w-full flex-grow">
                <section id="featured">
                    {/* Updated count to show filtered number */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        {filteredPapers.length !== papers.length 
                            ? `Found ${filteredPapers.length} Result${filteredPapers.length === 1 ? '' : 's'}`
                            : `Featured Publications (${papers.length})`
                        }
                    </h2>
                    
                    {/* Check if filter returned 0 results */}
                    {filteredPapers.length === 0 ? (
                         <div className="text-center text-gray-500 py-10">
                            <p className="text-xl">No publications match your search criteria.</p>
                            <button 
                                onClick={() => setFilterCriteria({ title: '', author: '', keyword: '' })}
                                className="mt-4 text-blue-600 hover:underline"
                            >
                                Clear all filters
                            </button>
                         </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch place-items-center">
                            {/* <--- MAP OVER FILTERED PAPERS ---> */}
                            {filteredPapers.map((p) => (
                                <PaperCard key={p.id} paper={p} onViewDetails={() => openModal(p)} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-gray-900 mt-auto">
                <p>© {new Date().getFullYear()} HCI Research Group. All rights reserved.</p>
                
                {!isAdmin && (
                    <button 
                        onClick={handleAdminClick}
                        className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition block mx-auto"
                    >
                        Admin Access
                    </button>
                )}
            </footer>
        </div>
    );
};

export default PublicDisplay;