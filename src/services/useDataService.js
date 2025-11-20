// src/services/useDataService.js

import { useState, useEffect } from 'react';
import { db } from './firebase'; // Imports the Firestore instance
import { collection, onSnapshot } from 'firebase/firestore';

// Define the collections we are listening to
const COLLECTIONS = {
    PAPERS: 'research_papers',
    SETTINGS: 'site_settings'
};

/**
 * Custom React hook to fetch and listen to real-time data from Firestore.
 */
export const useDataService = () => {
    const [researchPapers, setResearchPapers] = useState([]);
    const [siteSettings, setSiteSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to listen to a single collection
        const subscribeToCollection = (collectionName, setStateFn, isSingleDoc = false) => {
            const collectionRef = collection(db, collectionName);
            
            return onSnapshot(collectionRef, (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (isSingleDoc) {
                    // For site_settings, we often just want the first (or only) document
                    setStateFn(data.length > 0 ? data[0] : null);
                } else {
                    // For research_papers, we want the whole array
                    setStateFn(data);
                }

                setLoading(false);
            }, (err) => {
                console.error("Firestore subscription error:", err);
                setError(err);
                setLoading(false);
            });
        };

        // Set up listeners for the two collections
        const unsubscribePapers = subscribeToCollection(COLLECTIONS.PAPERS, setResearchPapers, false);
        const unsubscribeSettings = subscribeToCollection(COLLECTIONS.SETTINGS, setSiteSettings, true);

        // Cleanup function: stop listening when the component unmounts
        return () => {
            unsubscribePapers();
            unsubscribeSettings();
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return { researchPapers, siteSettings, loading, error };
};