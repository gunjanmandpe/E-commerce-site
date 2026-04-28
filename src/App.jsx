import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">
        <p>
          Built with ❤️ by <span className="footer-brand">CatalogX</span> — Dynamic Multi-Category Catalog
        </p>
      </footer>
    </Router>
  );
}

export default App;
