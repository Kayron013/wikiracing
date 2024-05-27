'use client';

import { getRandomPageTitle, getSuggestedPageTitles } from '@/services/wikipedia';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestedPageTitles, setSuggestedPageTitles] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      getSuggestedPageTitles(query).then(setSuggestedPageTitles);
    }
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    getRandomPageTitle().then(setQuery);
  };

  const navigateToWikiPage = () => {
    router.push(`/wiki/${query}`);
  };

  return (
    <>
      <input type='text' list='pageTitleSuggestions' value={query} onChange={handleInputChange} />
      <datalist id='pageTitleSuggestions'>
        {suggestedPageTitles.map(title => (
          <option value={title}>{title}</option>
        ))}
      </datalist>
      <button onClick={navigateToWikiPage}>Go</button>
      <button onClick={handleButtonClick}>Random</button>
    </>
  );
}
