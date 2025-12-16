// src/hooks/usePaperSubmit.js

import { useState, useCallback } from 'react';
import { ref, push } from 'firebase/database';
import { rtdb } from '../services/firebase';

// 🚨 CRITICAL: Use the exact same key you published in your Firebase Rules!
const ADMIN_SECRET_KEY = "R3s3archP@p3rAdm!nK3y2025"; 

/**
 * usePaperSubmit
 * Returns: { submitPaper, isLoading, error, isSuccess }
 * NOTE: The hook NO LONGER accepts paperData. submitPaper accepts it.
 */
// 1. Hook takes NO arguments
export default function usePaperSubmit() { 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // Renamed 'success' to 'isSuccess' for clarity

  // 2. submitPaper accepts the LATEST paperData object when called
  const submitPaper = useCallback(async (paperData) => { 
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { title, authors, year, link } = paperData;

      // Basic validation
      if (!title || !authors || !year || !link) {
        throw new Error('Please fill out all fields.');
      }

      const papersRef = ref(rtdb, 'papers');
      
      // 3. Build the payload, injecting the secret key
      const payload = {
        title: String(title).trim(),
        authors: String(authors).trim(),
        year: parseInt(String(year), 10) || null,
        link: String(link).trim(),
        submittedAt: Date.now(),
        adminKey: ADMIN_SECRET_KEY // Required by your security rules!
      };

      await push(papersRef, payload);

      setSuccess(true);
      // No need to return true/false, the component will watch 'isSuccess'
    } catch (err) {
      setError(err.message || String(err));
      // Do not set isSuccess to false here, it's already done at the start.
    } finally {
      setIsLoading(false);
    }
  }, []); // 4. Dependency array is EMPTY now! The hook only relies on its state setters.

  return { submitPaper, isLoading, error, isSuccess }; // Renamed success -> isSuccess
}