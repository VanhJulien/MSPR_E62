// Ce composant est la barre de navigation du site Web.
// On commence par importer les dépendances nécessaires (React, logo)

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
    componentDidMount() {
        const showNavbar = (toggleId, navId, bodyId, headerId) => {
            const toggle = document.getElementById(toggleId),
                nav = document.getElementById(navId),
                bodypd = document.getElementById(bodyId),
                headerpd = document.getElementById(headerId)
    
            // Vérification que toutes les variables existent
            if (toggle && nav && bodypd && headerpd) {
                toggle.addEventListener('click', () => {
                    // Afficher navbar
                    nav.classList.toggle('show')
                    // Changer l'icone
                    toggle.classList.toggle('bx-x')
                    // Ajouter du padding au body
                    bodypd.classList.toggle('body-pd')
                    // Ajouter du padding au header
                    headerpd.classList.toggle('body-pd')
                })
            }
        }
        
        showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')
    
        /*===== LINK ACTIVE =====*/
        const linkColor = document.querySelectorAll('.nav_link')
    
        function colorLink() {
            if (linkColor) {
                linkColor.forEach(l => l.classList.remove('active'))
                this.classList.add('active')
            }
        }
        linkColor.forEach(l => l.addEventListener('click', colorLink))
    }

  render () {
    return (
      <div id="body-pd">
          {/* Ajout de la barre supérieure servant d'en-tête pour le logo, le bouton pour agrandir la barre latérale et d'éventuelles informations supplémentaires */} 
          <header className="header" id="header">
              <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"/> </div>
              <div className="header_img"> <img src="/images/plante.png" className='header_img' alt="logo"></img> </div>
          </header>

          {/* Ajout de la barre latérale servant d'accès aux différentes pages */} 
          <div className="l-navbar" id="nav-bar">
              <nav className="nav">
                  <div> 
                    {/* Redirection vers accueil */} 
                    <NavLink 
                        className="nav_logo bx bx-layer nav_logo-icon nav_logo-name"
                        to="/#">
                        Accueil
                    </NavLink>

                      <div className="nav_list"> 
                          {/* Redirection vers la page des plantes */} 
                          <a href="/#/plantes" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Plantes</span> </a> 
                          {/* Redirection vers la page de Connexion */} 
                          <a href="/#/login" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Connexion</span> </a> 
                          {/* Redirection vers la page d' Inscription' */} 
                          <a href="/#/register" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Inscription</span> </a> 
                      </div>
                    
                  </div> 
              </nav>
          </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type="text/Javascript" src="./scripts/navbar.js"></script>
        </div>
    )
  };
};  

// On exporte notre barre de navigation
export default NavBar;