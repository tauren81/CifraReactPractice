import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { css } from '../../styled-system/css';
import { getCategories } from '../api/news-api';

const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
          Аггрегатор новостей
        </Link>
        <div
          className={css({
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '8px 0',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          })}
        >
          <Link
            key="Все"
            onClick={() => handleCategoryChange('Все')}
            to={`/`}
            className={css({
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor:
                selectedCategory === 'Все' ? 'blue.500' : 'gray.100',
              color: selectedCategory === 'Все' ? 'white' : 'gray.800',
              fontWeight: 'medium',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              fontSize: '14px',
              _hover: {
                backgroundColor:
                  selectedCategory === 'Все' ? 'blue.600' : 'gray.200',
              },
            })}
          >
            Все
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              onClick={() => handleCategoryChange(category)}
              to={`/category/${category}`}
              className={css({
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor:
                  selectedCategory === category ? 'blue.500' : 'gray.100',
                color: selectedCategory === category ? 'white' : 'gray.800',
                fontWeight: 'medium',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontSize: '14px',
                _hover: {
                  backgroundColor:
                    selectedCategory === category ? 'blue.600' : 'gray.200',
                },
              })}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      {/*
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '4',
          })}
        >
          <Link
            to="/"
            className={css({
              divideX: '5px',
              border: 'md-10',
              padding: '2',
              color: 'red.100',
              borderRadius: '20px',
              transition: 'transform 1s',
              _hover: {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 15px -3px rgba(78, 198, 62, 0.87)',
              },
            })}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className={css({
                divideX: '5px',
                border: 'md-10',
                padding: '2',
                color: 'red.100',
                borderRadius: '20px',
                transition: 'transform 1s',
                _hover: {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 15px -3px rgba(78, 198, 62, 0.87)',
                },
              })}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      */}
    </nav>
  );
};

export default Navbar;
