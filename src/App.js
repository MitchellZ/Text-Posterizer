import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Generator from './pages/Generator';
import About from './pages/About';

// Defining the default function for the App component
export default function App() {
  return (
    <div>
      < Navbar />
      <Router>
        <div>
        </div>
        <Routes>
          {/* Defining routes for the pages */}
          <Route exact path="/" element={<Generator />} />
          <Route exact path="/About" element={<About />} />
        </Routes>
        <div>
        </div>
      </Router>
      <Footer />
    </div>
  );
}
