import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import FavoritesPage from './pages/favorites-page/FavoritesPage';
import HomePage from './pages/home-page/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
