// src/components/NewsArticle.tsx
import { css } from '../../styled-system/css';
import { NewsArticleIntf } from '../api/newsApi';

interface NewsArticleProps {
  article: NewsArticleIntf;
}

export const NewsArticle = ({ article }: NewsArticleProps) => {
  return (
    <article
      className={css({
        borderWidth: '1px',
        borderRadius: 'lg',
        overflow: 'hidden',
        mb: '4',
        bg: 'white',
        boxShadow: 'md',
      })}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className={css({ w: 'full', h: '48', objectFit: 'cover' })}
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
