import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div className="app">
            <Router>
                <Header />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;