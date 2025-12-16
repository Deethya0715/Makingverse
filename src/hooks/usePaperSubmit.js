// src/hooks/usePaperSubmit.js (Replace the function signature)

import { useState, useCallback } from 'react';
import { ref, push } from 'firebase/database';
import { rtdb } from '../services/firebase';

const ADMIN_SECRET_KEY = "R3s3archP@p3rAdm!nK3y2025"; 

// 🚨 CHANGE THIS LINE: Use export const to make it a named export
export const usePaperSubmit = () => { 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false); 
    // ... rest of the hook logic ...

    const submitPaper = useCallback(async (paperData) => { 
        // ... hook logic here ...
    }, []); 

    // The return statement is correct:
    return { submitPaper, isLoading, error, isSuccess }; 
};