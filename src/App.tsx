import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Photopage from './pages/Photopage';
import Weatherpage from './pages/Weatherpage';
import Newspage from './pages/Newspage';

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
