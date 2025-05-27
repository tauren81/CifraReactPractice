import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { css } from '../../styled-system/css';
import { getNews, NewsItem } from '../api/news-api';

import NewsCard from './news-card';

const NewsList = () => {
  const { category } = useParams();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView, entry } = useInView({
    threshold: [0.1, 0.5, 1],
  });

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    if (loading || !hasMore) return;

    if (!inView) return;
    const fetchNews = async () => {
      setLoading(true);
      try {
        const newNews = await getNews(category, page);
        if (newNews.length === 0) {
          setHasMore(false);
        } else {
          setNews((prev) => [...prev, ...newNews]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [inView, category, page, loading, hasMore]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setLoading(true);
      //setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMore]);

  return (
    <div>
      {/*<h2>{`Header inside viewport ${inView}. ${entry}`}</h2>*/}
      <div
        className={css({
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          })}
        >
          {category ? `${category} Новости` : `'Последние новости'`}
        </h1>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          {news.map((item, index) => (
            <NewsCard key={`${item.id}-${index}`} newsItem={item} />
          ))}
        </div>

        {/* Индикатор загрузки */}
        <div
          ref={ref}
          className={css({
            height: '1px',
            margin: '20px 0',
          })}
        />

        {loading && (
          <div
            className={css({
              display: 'flex',
              justifyContent: 'center',
              padding: '32px 0',
            })}
          >
            <div
              className={css({
                width: '40px',
                height: '40px',
                border: '4px solid #e2e8f0',
                borderTopColor: '#3182ce',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              })}
            />
          </div>
        )}

        {!hasMore && !loading && news.length > 0 && (
          <div
            className={css({
              textAlign: 'center',
              padding: '32px 0',
              color: 'gray.500',
              fontSize: '14px',
            })}
          >
            Вы дочитали до конца новостей в категории {category}
          </div>
        )}

        {!loading &&
          news.length === 0 && ( //!error && (
            <div
              className={css({
                textAlign: 'center',
                padding: '40px 0',
                color: 'gray.500',
              })}
            >
              Нет новостей в категории {category}
            </div>
          )}

        {/*
        {!loading && (
          <div ref={ref} className={css({ height: '20px' })}>
            ТУТ ЧТО-ТО что должно потенциально начать загрузку?
          </div>
        )}
        */}

        {/*
        {!hasMore && (
          <div className={css({ textAlign: 'center', padding: '20px' })}>
            No more news to load
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default NewsList;
