'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './styles.css';
import './wikipedia.1.css';
import './wikipedia.2.css';
import { getPageContent } from '@/services/wikipedia';

export default function Wiki() {
  const params = useParams<{ id: string }>();
  const wikiId = params.id;
  const [wikiContent, setWikiContent] = useState('');

  useEffect(() => {
    getPageContent(wikiId).then(setWikiContent);
  }, [wikiId]);

  return (
    <div>
      <div>Wiki Page: {params.id}</div>
      <div className='wiki-content' dangerouslySetInnerHTML={{ __html: wikiContent }} />
    </div>
  );
}
