// src/components/NewsFeed.tsx
import { useInView } from 'react-intersection-observer';

import { useUIStore } from '@/stores/uiStore';

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
    isRefetching,
  } = useNews();

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView: boolean) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading && !data) {
    return (
      <div className={css({ textAlign: 'center', py: '8' })}>
        Загрузка данных
      </div>
    );
  }

  return (
    <div className={css({ maxW: '2xl', mx: 'auto', px: '4' })}>
      {isError && (
        <div
          className={css({
            bg: 'yellow.100',
            p: '4',
            mb: '4',
            borderRadius: 'md',
            borderLeft: '4px solid',
            borderColor: 'yellow.500',
          })}
        >
          Формирование данных для симуляции работы апи
        </div>
      )}

      {isRefetching && (
        <div
          className={css({
            bg: 'blue.50',
            p: '2',
            mb: '2',
            textAlign: 'center',
            borderRadius: 'md',
          })}
        >
          Обновление {useUIStore.getState().selectedCategory} новостей...
        </div>
      )}

      {data?.pages.map((page: NewsResponse, i: number) => (
        <div key={i}>
          {page.articles.map((article: NewsArticleType) => (
            <NewsArticle
              key={`${article.publishedAt}-${article.title}`}
              article={article}
              isFallback={isError}
            />
          ))}
        </div>
      ))}

      <div ref={ref} className={css({ h: '20px', w: 'full' })}>
        {isFetchingNextPage && (
          <div className={css({ textAlign: 'center', py: '4' })}>
            Загружаем еще больше новостей{' '}
            {useUIStore.getState().selectedCategory} ...
          </div>
        )}
      </div>
    </div>
  );
};
