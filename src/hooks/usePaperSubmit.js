import { useState, useCallback } from 'react';
import { ref, push } from 'firebase/database';
import { rtdb } from '../services/firebase';

/**
 * usePaperSubmit
 * @param {Object} paperData - { title, authors, year, link }
 * Returns: { submitPaper, isLoading, error, success }
 */
export default function usePaperSubmit(paperData = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitPaper = useCallback(async () => {
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
      const payload = {
        title: String(title).trim(),
        authors: String(authors).trim(),
        year: parseInt(String(year), 10) || null,
        link: String(link).trim(),
        submittedAt: Date.now(),
      };

      await push(papersRef, payload);

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || String(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [paperData]);

  return { submitPaper, isLoading, error, success };
}
