import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ItemPage from './pages/ItemPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage'; // Importar la página de administración
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collections/:collectionId" element={<CollectionPage />} />
                <Route path="/items/:itemId" element={<ItemPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin" element={<AdminPage />} /> {/* Nueva ruta para la página de administración */}
            </Routes>
        </Router>
    );
}

export default App;
