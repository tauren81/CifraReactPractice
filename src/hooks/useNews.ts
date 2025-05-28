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

const generateCategoryIcon = (category: string): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d')!;

  // Цвета для разных категорий
  const colors: Record<string, string> = {
    business: '#3498db',
    technology: '#2ecc71',
    sports: '#e74c3c',
    entertainment: '#9b59b6',
    health: '#1abc9c',
    science: '#f39c12',
    general: '#95a5a6',
  };

  // Рисуем фон
  ctx.fillStyle = colors[category] || '#7f8c8d';
  ctx.fillRect(0, 0, 16, 16);

  // Рисуем символ категории
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const symbols: Record<string, string> = {
    business: '$',
    technology: '⚙',
    sports: '⚽',
    entertainment: '🎬',
    health: '❤',
    science: '🔬',
    general: '📰',
  };

  ctx.fillText(symbols[category] || 'N', 8, 8);

  return canvas.toDataURL();
};

// Фейковые данные для fallback
// Генератор фейковых новостей для разных категорий
const generateFakeNews = (category: string, count: number): NewsResponse => {
  const iconUrl = generateCategoryIcon(category);

  const categoryTitles: Record<string, string> = {
    business: 'Новости бинеса',
    technology: 'Новости технологий',
    sports: 'Спортивные новости',
    entertainment: 'Новости развлечений',
    health: 'Новости здравоохранения',
    science: 'Новости науки',
    general: 'Главные новости',
  };

  return {
    status: 'ok',
    totalResults: count * 3, // Имитируем пагинацию
    articles: Array(count)
      .fill(null)
      .map((_, i) => ({
        source: {
          id: null,
          name: `${categoryTitles[category] || 'News'} Source`,
        },
        author: `Фейковый ${category} автор ${i + 1}`,
        title: `${categoryTitles[category] || 'новости'} Заголовок ${i + 1}: ${fakePhrases[Math.floor(Math.random() * fakePhrases.length)]}`,
        description: `Это фейковые ${category} описание новости ${fakeTopics[Math.floor(Math.random() * fakeTopics.length)]}.`,
        url: `https://fake-news-api.com/${category}/${i + 1}`,
        urlToImage: i % 3 === 0 ? null : iconUrl, // 33% новостей без иконки
        publishedAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        content: `Фейковое ${category} содержание новости. ${Array(3)
          .fill(null)
          .map(
            () => fakeContent[Math.floor(Math.random() * fakeContent.length)],
          )
          .join(' ')}`,
      })),
  };
};

// Фразы для генерации разнообразных заголовков
const fakePhrases = [
  'Сенсационные новости',
  'Эксклюзивный репортаж',
  'Последние обновления',
  'Шокирующее открытие',
  'Анализ отрасли',
];

const fakeTopics = [
  'тенденции на рынке',
  'технологические достижения',
  'спортивные события',
  'новости о знаменитостях',
  'медицинские прорывы',
];

const fakeContent = [
  'Ситуация продолжает стремительно развиваться.',
  'Эксперты расходятся во мнениях по этому вопросу.',
  'Это развитие событий может иметь далеко идущие последствия.',
  'Власти внимательно следят за ситуацией.',
  'По мере поступления информации будут предоставляться дополнительные обновления.',
];

export const useNews = () => {
  const selectedCategory = useUIStore((state) => state.selectedCategory);

  const queryFn = async (
    context: QueryFunctionContext<NewsQueryKey, number>,
  ): Promise<NewsResponse> => {
    try {
      // Имитация задержки сети
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 500),
      );

      const realData = await fetchNews(
        selectedCategory,
        context.pageParam ?? 1,
      );
      return realData;
    } catch (error) {
      // Возвращаем фейковые данные, соответствующие категории
      console.warn(
        `Использование фейковых данных ${selectedCategory} катогории`,
      );
      return generateFakeNews(selectedCategory, 10);
    }
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
    staleTime: 1000, //1000 * 60 * 5, // 5 minutes
    placeholderData: (previous) => previous,
    initialPageParam: 1,
    retry: 1,
  };

  return useInfiniteQuery(queryOptions);
};

export type NewsQueryData = InfiniteData<NewsResponse>;
