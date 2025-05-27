// src/api/newsApi.ts
import axios from 'axios';

const API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticleIntf {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticleIntf[];
}

export const fetchNews = async (
  category: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<NewsResponse> => {
  try {
    const response = await axios.get<NewsResponse>(
      `${BASE_URL}/top-headlines`,
      {
        params: {
          country: 'us',
          category,
          page,
          pageSize,
          apiKey: API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(`'Failed to fetch news error: ${error}'`);
  }
};
