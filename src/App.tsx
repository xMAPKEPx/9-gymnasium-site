import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import PeoplePage from './pages/PeoplePage';
import AssociationPage from './pages/AssociationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/association" element={<AssociationPage />} />
      </Routes>
    </Router>
  )
}

export default App
