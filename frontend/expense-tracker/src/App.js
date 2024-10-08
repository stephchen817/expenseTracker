import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './container/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/App.css';
import './index.css';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
