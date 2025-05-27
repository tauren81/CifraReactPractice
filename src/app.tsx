import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import NewsDetail from './components/news-detail';
import NewsList from './components/news-list';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NewsList />} />
        <Route path="/category/:category" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
