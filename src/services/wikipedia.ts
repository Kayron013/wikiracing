export const getPageContent = (pageName: string): Promise<string> => {
  const url = `https://en.wikipedia.org/w/api.php?page=${pageName}&origin=*&action=parse&format=json&disableeditsection=true&redirects=true`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => json.parse.text['*']);
};

export const getSuggestedPageTitles = (query: string): Promise<string[]> => {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}&limit=10&format=json`;
  return fetch(url)
    .then(resp => resp.json() as Promise<OpenSearchResponse>)
    .then(json => json[1]);
};

type OpenSearchResponse = [query: string, titles: string[], descriptions: string[], urls: string[]];

export const getRandomPageTitle = (): Promise<string> => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&rnnamespace=0&list=random&format=json&origin=*`;
  return fetch(url)
    .then(r => r.json())
    .then(json => json.query.random[0].title);
};
