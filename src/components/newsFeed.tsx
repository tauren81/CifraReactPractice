// src/components/NewsFeed.tsx
import { useInView } from 'react-intersection-observer';

import { css } from '../../styled-system/css';
import {
  NewsArticleIntf as NewsArticleType,
  NewsResponse,
} from '../api/newsApi';
import { useNews } from '../hooks/useNews';

import { NewsArticle } from './newsArticle';

export const NewsFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useNews();

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView: boolean) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return (
      <div className={css({ textAlign: 'center', py: '8' })}>Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className={css({ textAlign: 'center', py: '8', color: 'red.500' })}>
        Error loading news
      </div>
    );
  }

  return (
    <div className={css({ maxW: '2xl', mx: 'auto', px: '4' })}>
      {data?.pages.map((page: NewsResponse, i: number) => (
        <div key={i}>
          {page.articles.map((article: NewsArticleType) => (
            <NewsArticle
              key={`${article.publishedAt}-${article.title}`}
              article={article}
            />
          ))}
        </div>
      ))}
      <div ref={ref} className={css({ h: '20px', w: 'full' })}>
        {isFetchingNextPage && (
          <div className={css({ textAlign: 'center', py: '4' })}>
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};
