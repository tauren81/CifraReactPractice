// src/components/NewsArticle.tsx
import { css } from '../../styled-system/css';
import { NewsArticleIntf } from '../api/newsApi';

interface NewsArticleProps {
  article: NewsArticleIntf;
  isFallback?: boolean;
}

export const NewsArticle = ({
  article,
  isFallback = false,
}: NewsArticleProps) => {
  return (
    <article
      className={css({
        borderWidth: '1px',
        borderRadius: 'lg',
        overflow: 'hidden',
        mb: '4',
        bg: isFallback ? 'gray.50' : 'white',
        boxShadow: 'md',
        position: 'relative',
        _hover: {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s',
        },
      })}
    >
      {isFallback && (
        <div
          className={css({
            position: 'absolute',
            top: '2',
            right: '2',
            bg: 'yellow.500',
            color: 'white',
            px: '2',
            py: '1',
            borderRadius: 'full',
            fontSize: 'xs',
            fontWeight: 'bold',
          })}
        >
          Симуляция
        </div>
      )}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt=""
          className={css({
            w: '16px',
            h: '16px',
            flexShrink: 0,
            objectFit: 'contain',
          })}
        />
      )}
      <div className={css({ p: '4' })}>
        <h3 className={css({ fontSize: 'xl', fontWeight: 'bold', mb: '2' })}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={css({ _hover: { textDecoration: 'underline' } })}
          >
            {article.title}
          </a>
        </h3>
        <p className={css({ color: 'gray.600', mb: '2' })}>
          {article.description}
        </p>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            color: 'gray.500',
            fontSize: 'sm',
          })}
        >
          <span>{article.source.name}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
};
