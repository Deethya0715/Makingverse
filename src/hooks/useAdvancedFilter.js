import { useMemo } from 'react';

export const useAdvancedFilter = (papers, filters) => {
  return useMemo(() => {
    // Safety check: if no papers, return empty array
    if (!papers || !Array.isArray(papers)) return [];

    return papers.filter((paper) => {
      // 1. Get search queries safely
      const titleQuery = (filters.title || '').toLowerCase().trim();
      const authorQuery = (filters.author || '').toLowerCase().trim();
      const keywordQuery = (filters.keyword || '').toLowerCase().trim();

      // 2. CHECK TITLE
      // Checks both "Title" (DB) and "title" (standard)
      const paperTitle = String(paper.Title || paper.title || '').toLowerCase();
      const matchesTitle = titleQuery ? paperTitle.includes(titleQuery) : true;

      // 3. CHECK AUTHOR
      // Handles if authors is a string OR an array of objects
      let authorText = '';
      if (Array.isArray(paper.authors)) {
        // If it's an array of objects like [{name: 'Deethya'}, {name: 'John'}]
        authorText = paper.authors.map(a => (typeof a === 'string' ? a : a.name)).join(' ');
      } else if (paper["Author List"]) {
        // If it's the raw string from your screenshot
        authorText = String(paper["Author List"]);
      } else {
        // Fallback
        authorText = String(paper.authors || '');
      }
      const matchesAuthor = authorQuery 
        ? authorText.toLowerCase().includes(authorQuery) 
        : true;

      // 4. CHECK KEYWORDS & ABSTRACT
      const abstractRaw = String(paper.Abstract || paper.abstract || '');
      // Handle keywords being an array or a string
      const keywordsRaw = paper.Keywords || paper.keywords || '';
      const keywordsStr = Array.isArray(keywordsRaw) ? keywordsRaw.join(' ') : String(keywordsRaw);
      
      // We search both Abstract and Keywords for the "Keyword" filter
      const combinedContext = (abstractRaw + " " + keywordsStr).toLowerCase();
      
      const matchesKeyword = keywordQuery 
        ? combinedContext.includes(keywordQuery) 
        : true;

      // 5. Must match ALL active filters
      return matchesTitle && matchesAuthor && matchesKeyword;
    });
  }, [papers, filters]);
};