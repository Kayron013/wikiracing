'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Wiki() {
  const params = useParams<{ id: string }>();
  const wikiId = params.id;
  const [wikiContent, setWikiContent] = useState('');
  const url = `https://en.wikipedia.org/w/api.php?page=${wikiId}&origin=*&action=parse&format=json&disableeditsection=true&redirects=true`;
  useEffect(() => {
    fetch(url).then(async r => {
      const resp = await r.json();
      setWikiContent(resp.parse.text['*']);
      console.log({ text: resp.parse.text });
    });
  }, [wikiId]);
  const resp = fetch(url);

  return (
    <div>
      <div>Wiki Page: {params.id}</div>
      <div dangerouslySetInnerHTML={{ __html: wikiContent }} />
    </div>
  );
}
