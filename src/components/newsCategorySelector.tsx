// src/components/NewsCategorySelector.tsx
import { css } from '../../styled-system/css';
import { useUIStore } from '../stores/uiStore';

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

export const NewsCategorySelector = () => {
  const { selectedCategory, setSelectedCategory } = useUIStore();

  return (
    <div
      className={css({
        display: 'flex',
        gap: '2',
        overflowX: 'auto',
        py: '4',
        mb: '4',
      })}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={css({
            px: '4',
            py: '2',
            borderRadius: 'md',
            bg: selectedCategory === category ? 'blue.500' : 'gray.200',
            color: selectedCategory === category ? 'white' : 'gray.800',
            fontWeight: 'semibold',
            cursor: 'pointer',
            _hover: {
              bg: selectedCategory === category ? 'blue.600' : 'gray.300',
            },
          })}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};
