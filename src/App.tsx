import './styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/navbar/Navbar';

const Homepage = lazy(() => import('./pages/home/'));
const Photopage = lazy(() => import('./pages/gallery/'));
const Weatherpage = lazy(() => import('./pages/weather/'));
const Newspage = lazy(() => import('./pages/news/'));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Загрузка страницы...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/gallery" element={<Photopage />} />
          <Route path="/weather" element={<Weatherpage />} />
          <Route path="/news" element={<Newspage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
