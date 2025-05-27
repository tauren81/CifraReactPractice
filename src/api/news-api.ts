import axios from 'axios';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  source?: string;
}

const API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = 'YOUR_API_KEY'; // Замените на ваш API ключ

const cache = new Map<string, any>();

async function fetchWithCache<T>(url: string): Promise<T> {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await axios.get(url);
  cache.set(url, response.data);
  return response.data;
}

export const getCategories = async (): Promise<string[]> => {
  // В реальном приложении это может быть запрос к API
  // Здесь для примера возвращаем фиксированный список
  return [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
};

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export const getNews = async (
  category?: string,
  page: number = 1,
  pageSize: number = 5,
): Promise<NewsItem[]> => {
  const url = category
    ? `${API_BASE_URL}/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    : `${API_BASE_URL}/top-headlines?country=ru&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  try {
    const data = await fetchWithCache<{ articles: any[] }>(url);

    try {
      const result = data.articles.map((article, index) => ({
        id: `${article.publishedAt}-${index}`,
        title: article.title,
        summary: article.description,
        content: article.content || article.description,
        category: category || 'general',
        publishedAt: article.publishedAt,
        imageUrl: article.urlToImage,
        source: article.source?.name,
      }));

      return result;
    } catch (error_one) {
      console.error('Error fetching news:', error_one);

      const resultNews = await fetchWithCache<NewsItem[]>(url);

      return resultNews;
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    // В случае ошибки возвращаем моковые данные
    await timeout(1000);

    const data = mockNews
      .filter((e) => (category ? e.category === category : true))
      .slice((page - 1) * pageSize, page * pageSize);

    cache.set(url, data);

    return data;
  }
};

export const getNewsItem = async (id: string): Promise<NewsItem> => {
  try {
    // В реальном API такого эндпоинта может не быть,
    // поэтому эмулируем получение одной новости
    const allNews = await getNews();
    const foundItem = allNews.find((item) => item.id === id);

    if (foundItem) {
      return foundItem;
    }

    // Если не нашли, возвращаем моковую новость
    return mockNews[0];
  } catch (error) {
    console.error('Error fetching news item:', error);
    return mockNews[0];
  }
};

// Моковые данные на случай, если API не доступно
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Example News Title 1',
    summary: 'This is a summary of the first example news article. 1',
    content:
      'This is the full content of the first example news article. It contains more details than the summary.',
    category: 'technology',
    publishedAt: '2023-05-15T10:00:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '2',
    title: 'Example News Title 2',
    summary: 'This is a summary of the second example news article. 2',
    content:
      'This is the full content of the second example news article. It contains more details than the summary.',
    category: 'business',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '3',
    title: 'Example News Title 3',
    summary: '3.',
    content: '3333333333 333333333333',
    category: 'health',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '4',
    title: 'Example News Title 4',
    summary: '4.',
    content: '444444444 4444444444444',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '5',
    title: 'Example News Title 5',
    summary: '5.',
    content: '5555555555555555',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '6',
    title: 'Example News Title 6',
    summary: '6.',
    content: '666666666666666',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '7',
    title: 'Example News Title 7',
    summary: '7.',
    content: '7777777777',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '8',
    title: 'Example News Title 8',
    summary: '8.',
    content: '888888888',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '9',
    title: 'Example News Title 9',
    summary: '9.',
    content: '9999999999',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '10',
    title: 'Example News Title 10',
    summary: '10.',
    content: '55555555555555555555',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '11',
    title: 'Example News Title 11',
    summary: '11.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '12',
    title: 'Example News Title 12',
    summary: '12.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '13',
    title: 'Example News Title 13',
    summary: '13.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '14',
    title: 'Example News Title 14',
    summary: '14.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '15',
    title: 'Example News Title 15',
    summary: '15.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '16',
    title: 'Example News Title 16',
    summary: '16.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '17',
    title: 'Example News Title 17',
    summary: '17.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '18',
    title: 'Example News Title 18',
    summary: '18.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '19',
    title: 'Example News Title 19',
    summary: '19.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '20',
    title: 'Example News Title 20',
    summary: '20.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '21',
    title: 'Example News Title 21',
    summary: '21.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '22',
    title: 'Example News Title 22',
    summary: '22.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '23',
    title: 'Example News Title 23',
    summary: '23.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '24',
    title: 'Example News Title 24',
    summary: '24.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  {
    id: '25',
    title: 'Example News Title 25',
    summary: '25.',
    content: '1111111111111111111111111',
    category: 'science',
    publishedAt: '2023-05-14T09:30:00Z',
    imageUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/unknown-file-6239642-5179482.png?f=webp&w=256',
    source: 'Example News',
  },
  // Добавьте больше моковых данных по необходимости
];
