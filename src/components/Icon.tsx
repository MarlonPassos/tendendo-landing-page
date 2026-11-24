const paths = {
  flame: 'M12 22a7 7 0 0 0 7-7c0-3-2-6-4-7 0 3-2 4-2 4 0-5-3-8-5-9 1 4-1 6-3 9-3 5 0 10 7 10Z',
  laptop: 'M4 17V5h16v12M2 17h20l-2 3H4l-2-3Z',
  fitness: 'm6 6 12 12M4 9l5-5m6 16 5-5M2 7l5-5m10 20 5-5',
  book: 'M12 6c-3-2-7-3-10-2v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7 0-10 2Zm0 0v15',
  home: 'm2 11 10-8 10 8M5 9v12h14V9M10 21v-6h4v6',
  bag: 'M4 7h16l1 14H3L4 7Zm4 2V6a4 4 0 0 1 8 0v3',
  grid: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z',
  trend: 'm3 17 6-6 4 4 7-9m-5 0h5v5',
  gift: 'M3 8h18v4H3zm2 4v9h14v-9M12 8v13m0-13C5 8 6 2 9 3c2 1 3 5 3 5Zm0 0c7 0 6-6 3-5-2 1-3 5-3 5Z',
  chat: 'M21 11.5a9 9 0 0 1-9 9 9 9 0 0 1-4-.9L3 21l1.3-4.8A9 9 0 1 1 21 11.5Z',
  whatsapp: 'M21 11.5a9 9 0 0 1-9 9 9 9 0 0 1-4-.9L3 21l1.3-4.8A9 9 0 1 1 21 11.5ZM9 8c-2 1 1 6 4 7 1 .5 2 0 2.5-1l-2-1-1 1c-2-1-3-2-3.5-3.5l1-1-1-2Z',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-11v6m0-10v.1',
  check: 'm5 12 4 4L19 6',
  arrowUp: 'M12 19V5m-6 6 6-6 6 6',
};

export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
