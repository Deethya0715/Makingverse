// src/hooks/useFetchPapers.js

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../services/firebase'; // Use your rtdb export

// Helper function to transform the raw imported data keys to the keys expected by the React component
const transformData = (paperData, key) => {
    // Attempt to extract the year from the "Publish Date" string (e.g., "2024-05-11...")
    const publishDate = new Date(paperData["Publish Date"]);
    const year = publishDate.getFullYear();
    
    // Check if the 'Link' field is available in your data, 
    // otherwise use the main object key (which is the DOI link)
    const link = paperData.PDF || key; 

    return {
        id: key, // Use the main key (the DOI link) as the unique ID
        // Map your existing field names to the lowercase names expected by the component
        title: paperData.Title,
        authors: paperData["Author List"], 
        year: isNaN(year) ? null : year, // Use the extracted year
        link: link,
        
        // Optional: Keep other fields if you might use them later
        venue: paperData.Venue,
        abstract: paperData.Abstract,
        doi: paperData.DOI
    };
};


export const useFetchPapers = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Since your raw JSON is nested, we listen from the root to capture it all
        // If you imported the JSON under a node named 'papers', change the ref to 'papers'
        const papersRef = ref(rtdb, '/'); 
        
        const unsubscribe = onValue(papersRef, (snapshot) => {
            const data = snapshot.val(); 
            const papersList = [];
            
            if (data) {
                // The root node contains keys that are the DOIs (your paper entries)
                Object.keys(data).forEach((key) => {
                    // Only process entries that look like papers (i.e., not system fields)
                    if (data[key] && data[key].Title) {
                        papersList.push(transformData(data[key], key));
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