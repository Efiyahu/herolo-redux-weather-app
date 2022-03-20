import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import FavoritesPage from './pages/favorites-page/FavoritesPage';
import HomePage from './pages/home-page/HomePage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
