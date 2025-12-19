// src/hooks/useFetchPapers.js

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../services/firebase'; 

// NOTE: If you don't have lodash installed, change the import to: const isNaN = Number.isNaN; 
const isNaN = Number.isNaN; 

// Helper function to transform the raw imported data keys to the keys expected by the React component
const transformData = (paperData, key) => {
    
    // 1. Determine the Year (Handles "Publish Date" from batch 1 or "year" from batch 2)
    let year = null;
    if (paperData["Publish Date"]) {
        const publishDate = new Date(paperData["Publish Date"]);
        year = publishDate.getFullYear();
    } else if (paperData.year) {
        year = parseInt(String(paperData.year));
    }

    // 2. Determine the Link (Handles multiple source link fields)
    const link = paperData.link || paperData.PDF || paperData.DOI || '#'; 

    // 2b. Determine the Video (accept common keys or fuzzy-match one)
    let video = null;
    if (paperData.Video) video = paperData.Video;
    else if (paperData.video) video = paperData.video;
    else if (paperData['Video Link']) video = paperData['Video Link'];
    else {
        const vKey = Object.keys(paperData).find(k => /video|movie|youtube/i.test(k));
        if (vKey) video = paperData[vKey];
    }

    // 2c. Determine the PDF specifically (useful when `link` is ambiguous)
    const pdf = paperData.PDF || paperData.pdf || null;

    // 2d. Determine the Page/Site (accept common keys or fuzzy-match one)
    let page = null;
    if (paperData.Page) page = paperData.Page;
    else if (paperData.page) page = paperData.page;
    else if (paperData['Site']) page = paperData['Site'];
    else if (paperData['Website']) page = paperData['Website'];
    else if (paperData['Site Link']) page = paperData['Site Link'];
    else {
        const pKey = Object.keys(paperData).find(k => /site|page|website|url|homepage/i.test(k));
        if (pKey) page = paperData[pKey];
    }

    return {
        id: key, 
        // 3. Map Fields (Check for multiple casing/names)
        title: paperData.Title || paperData.title || 'Untitled Paper',
        authors: paperData["Author List"] || paperData.authors || 'Unknown Authors', 
        year: isNaN(year) ? null : year,
        link: link,
        video: video && String(video).trim() !== '' ? video : null,
        pdf: pdf,
        page: page && String(page).trim() !== '' ? page : null,
        venue: paperData.Venue,
        abstract: paperData.Abstract,
        doi: paperData.DOI
    };
};


export const useFetchPapers = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen ONLY to the 'papers' node where your combined data resides
        const papersRef = ref(rtdb, 'papers'); 
        
        const unsubscribe = onValue(papersRef, (snapshot) => {
            const data = snapshot.val(); 
            const papersList = [];
            
            if (data) {
                // Iterate over the sequential keys (1, 2, 3...)
                Object.keys(data).forEach((key) => {
                    const paper = data[key];
                    // Ensure the paper object has a recognizable title field
                    if (paper && (paper.Title || paper.title)) { 
                        papersList.push(transformData(paper, key));
                    }
                });
            }
            
            // Sort by year, newest first
            papersList.sort((a, b) => b.year - a.year); 
            
            setPapers(papersList);
            setLoading(false);
        }, (error) => {
            console.error("Error reading papers:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { papers, loading };
};