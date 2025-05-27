import { Link } from 'react-router-dom';

import { css } from '../../styled-system/css';
import { NewsItem } from '../api/news-api';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  return date.toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface NewsCardProps {
  newsItem: NewsItem;
}

const NewsCard = ({ newsItem }: NewsCardProps) => {
  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        cursor: 'pointer',
        _hover: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
        },
      })}
    >
      <Link to={`/news/${newsItem.id}`}>
        {/*
        <img
          src={
            newsItem.imageUrl ||
            'https://cdn.iconscout.com/icon/free/png-512/free-unknown-file-icon-download-in-svg-png-gif-formats--document-files-folder-pack-folders-icons-2079212.png?f=webp&w=256'
          } // || 'https://via.placeholder.com/300x200'}
          alt={newsItem.title}
          className={css({
            width: '2%',
            height: '2%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            _hover: {
              transform: 'scale(1.03)',
            },
          })}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        */}
        {/*
        <div className={css({ padding: '16px' })}>
          <h2
            className={css({
              fontSize: 'xl',
              fontWeight: 'bold',
              marginBottom: '8px',
            })}
          >
            {newsItem.title}
          </h2>
          <p
            className={css({
              color: 'gray.600',
              marginBottom: '12px',
              fontSize: 'sm',
            })}
          >
            {newsItem.summary}
          </p>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <span
              className={css({
                backgroundColor: 'blue.100',
                color: 'blue.800',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: 'xs',
              })}
            >
              {newsItem.category}
            </span>
            <span
              className={css({
                color: 'gray.500',
                fontSize: 'xs',
              })}
            >
              {new Date(newsItem.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        */}
        <div className={css({ padding: '16px' })}>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            })}
          >
            {newsItem.imageUrl && (
              <img
                src={
                  newsItem.imageUrl ||
                  'https://cdn.iconscout.com/icon/free/png-512/free-unknown-file-icon-download-in-svg-png-gif-formats--document-files-folder-pack-folders-icons-2079212.png?f=webp&w=256'
                } // || 'https://via.placeholder.com/300x200'}}
                alt={newsItem.title}
                className={css({
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                })}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="60" font-size="50" text-anchor="middle" fill="%23999">📰</text></svg>';
                }}
              />
            )}
            <span
              className={css({
                fontSize: '14px',
                color: 'gray.600',
              })}
            >
              {newsItem.source}
            </span>
            <span
              className={css({
                fontSize: '12px',
                color: 'blue.500',
                backgroundColor: 'blue.50',
                padding: '2px 8px',
                borderRadius: '4px',
                marginLeft: 'auto',
              })}
            >
              {newsItem.category}
            </span>
          </div>

          <h2
            className={css({
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px',
              lineHeight: '1.4',
              color: 'gray.900',
            })}
          >
            {newsItem.title}
          </h2>

          {newsItem.summary && (
            <p
              className={css({
                fontSize: '14px',
                color: 'gray.600',
                marginBottom: '12px',
                lineHeight: '1.5',
              })}
            >
              {newsItem.summary}
            </p>
          )}

          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <time
              className={css({
                fontSize: '12px',
                color: 'gray.500',
              })}
            >
              {formatDate(newsItem.publishedAt)}
              {/*{formatDate(newsItem.publishedAt)}*/}
            </time>

            <span
              className={css({
                fontSize: '12px',
                color: 'blue.500',
                fontWeight: 'medium',
              })}
            >
              Далее →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
