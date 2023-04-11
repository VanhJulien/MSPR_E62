// On commence par importer toutes les dépendances nécessaires (React, libraire de notifications, pages, composants)

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Popup from "reactjs-popup";
import "./styles/app.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Plantes from "./pages/Plantes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Ensuite, on crée le routing de notre application. Ce qui signifie choisir la page à envoyer à l'utilisateur en fonction de l'URL saisie.
export default function App() {
    
    return (
      <>
        {/* Composant React qui permet la création du Routing */}
        <HashRouter>
          <Popup />
          <div className="row">
  
            <div className="col container-fluid p-0">
              {/* Composant React qui permet d'afficher la barre de navigation sur toutes les pages */}
              <NavBar/>
              
                <Routes>
                    
                    {/* Route pour la page d'accueil */}
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    
                    {/* Route pour la page de gestion des plantes */}
                    <Route
                        path="/plantes"
                        element={<Plantes />}
                    />

                    {/* Route pour la page de connexion */}
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                           {/* Route pour la page d'inscription' */}
                           <Route
                        path="/register"
                        element={<Register />}
                    />

                </Routes >
            </div >
          </div >
        </HashRouter >
  
      </>
  
    );
  };
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);