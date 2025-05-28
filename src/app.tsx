// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { css } from '../styled-system/css';

import { NewsCategorySelector } from './components/newsCategorySelector';
import { NewsFeed } from './components/newsFeed';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={css({ minH: '100vh', bg: 'gray.100' })}>
        <header
          className={css({ bg: 'white', shadow: 'sm', py: '4', mb: '6' })}
        >
          <div className={css({ maxW: '6xl', mx: 'auto', px: '4' })}>
            <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
              Новостная лента
            </h1>
          </div>
        </header>
        <main className={css({ maxW: '6xl', mx: 'auto', px: '4' })}>
          <NewsCategorySelector />
          <NewsFeed />
        </main>
      </div>
    </QueryClientProvider>
  );
}
