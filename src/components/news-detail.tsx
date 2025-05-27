import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { css } from '../../styled-system/css';
import { getNewsItem, NewsItem } from '../api/news-api';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const item = await getNewsItem(id!);
        setNewsItem(item);
      } catch (err) {
        setError('Failed to load news item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <div className={css({ textAlign: 'center', padding: '40px' })}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={css({ textAlign: 'center', padding: '40px' })}>
        {error}
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className={css({ textAlign: 'center', padding: '40px' })}>
        News item not found
      </div>
    );
  }

  return (
    <div
      className={css({
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
      })}
    >
      <Link
        to="/"
        className={css({
          display: 'inline-block',
          marginBottom: '20px',
          color: 'blue.600',
          _hover: { textDecoration: 'underline' },
        })}
      >
        ← Back to news
      </Link>

      <h1
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          marginBottom: '20px',
        })}
      >
        {newsItem.title}
      </h1>

      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '10px',
        })}
      >
        <span
          className={css({
            backgroundColor: 'blue.100',
            color: 'blue.800',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: 'sm',
          })}
        >
          {newsItem.category}
        </span>
        <span
          className={css({
            color: 'gray.500',
            fontSize: 'sm',
          })}
        >
          {new Date(newsItem.publishedAt).toLocaleDateString()}
        </span>
      </div>

      <img
        src={
          newsItem.imageUrl ||
          'https://cdn.iconscout.com/icon/free/png-512/free-unknown-file-icon-download-in-svg-png-gif-formats--document-files-folder-pack-folders-icons-2079212.png?f=webp&w=256'
        } //'https://via.placeholder.com/800x400'}
        alt={newsItem.title}
        className={css({
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '20px',
        })}
      />

      <p
        className={css({
          fontSize: 'lg',
          lineHeight: '1.6',
          marginBottom: '20px',
        })}
      >
        {newsItem.summary}
      </p>

      <p
        className={css({
          fontSize: 'lg',
          lineHeight: '1.6',
        })}
      >
        {newsItem.content}
      </p>
    </div>
  );
};

export default NewsDetail;
