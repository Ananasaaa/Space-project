import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/home';
import Navbar from './components/navbar/Navbar';
import Photopage from './pages/gallery';
import Weatherpage from './pages/weather';
import Newspage from './pages/news';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Photopage />} />
        <Route path="/weather" element={<Weatherpage />} />
        <Route path="/news" element={<Newspage />} />
      </Routes>
    </Router>
  );
}

export default App;
