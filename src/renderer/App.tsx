import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './Main';
import './global.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
