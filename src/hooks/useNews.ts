// src/hooks/useNews.ts
import {
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';

import { fetchNews, NewsResponse } from '../api/newsApi';
import { useUIStore } from '../stores/uiStore';

type NewsQueryKey = readonly ['news', string];

export const useNews = () => {
  const selectedCategory = useUIStore((state) => state.selectedCategory);

  const queryFn = async (
    context: QueryFunctionContext<NewsQueryKey, number>,
  ): Promise<NewsResponse> => {
    return fetchNews(selectedCategory, context.pageParam ?? 1);
  };

  const queryOptions: UseInfiniteQueryOptions<
    NewsResponse,
    Error,
    InfiniteData<NewsResponse>,
    NewsResponse,
    NewsQueryKey,
    number
  > = {
    queryKey: ['news', selectedCategory] as const,
    queryFn,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (total, page) => total + page.articles.length,
        0,
      );
      return totalLoaded < lastPage.totalResults
        ? allPages.length + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previous) => previous,
    initialPageParam: 1,
  };

  return useInfiniteQuery(queryOptions);
};

export type NewsQueryData = InfiniteData<NewsResponse>;
