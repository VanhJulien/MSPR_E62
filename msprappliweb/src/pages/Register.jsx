import { toast } from "react-toastify";
import React, { useState } from "react";
import Field from "../components/forms/Field";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const [user, setUser] = useState({
      Username: "",
      Password: "",
      IsConditionsChecked: false,
    });
    const navigate = useNavigate();
  
    const handleChange = ({ currentTarget }) => {
      const { name, value } = currentTarget;
      setUser({ ...user, [name]: value });
    };
  
    const handleCheckboxChange = (e) => {
      user.IsConditionsChecked = e.target.checked;
      console.log(user)
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      let error = false;
  
      if (user.IsConditionsChecked === false) {
        toast.error("Conditions non acceptées")
        error = true;
      }
  
      if (user.Password.length < 8 || user.Password.length > 20) {
        toast.error("Le mot de passe doit faire entre 8 et 20 caractères")
        error = true;
      }
  
      if ((user.Password.toUpperCase() == user.Password) || (user.Password.toLowerCase() == user.Password)) {
        toast.error("Le mot de passe doit contenir au moins une lettre minuscule et majuscule")
        error = true;
      }
  
      if (!(/\d/.test(user.Password))) {
        toast.error("Le mot de passe doit contenir au moins un chiffre")
        error = true;
      }
  
      if (!(specialChars.test(user.Password))) {
        toast.error("Le mot de passe doit contenir au moins un caractère spécial")
        error = true;
      }
  
  
      if (error === false) {
        try {
          await axios.post("http://localhost:8000/api/comptes", {
            username: user.Username,
            password: user.Password,
            roles: ['ROLE_USER']
          });
          toast.success("Utilisateur ajouté")
          navigate.replace("/#/login");
        } catch (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        }
      }
  
    };
  
    return (
      <section className="bg-gray-200" >
        <div className="main-content  mt-0"></div>
          <div className="page-header align-items-start min-vh-100 FlexContainer"> 
            <span className="mask bg-gradient-dark opacity-6"></span>
              <div className="container my-auto">
                <div className="row">
                  <div className="col-lg-4 col-md-8 col-12 mx-auto">
                   <div className="card z-index-0 fadeIn3 fadeInBottom">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Créer Compte</h4>
                      </div>
                    </div>
                        <div className="card-body">
                          <form role="form text-left" onSubmit={handleSubmit}>
                            <Field
                              label="Nom d'utilisateur"
                              name="Username"
                              placeholder="Nom d'utilisateur"
                              value={user.Username}
                              onChange={handleChange}
                            />
                            <Field
                              label="Mot de passe"
                              name="Password"
                              type="password"
                              placeholder="Mot de passe"
                              value={user.Password}
                              minlength="3"
                              maxlength="20"
                              onChange={handleChange}
                            />
                              <div className="form-check form-check-info text-left">
                                <input name="IsConditionsChecked" className="form-check-input" type="checkbox" onChange={handleCheckboxChange} id="flexCheckDefault" />
                                <label className="form-check-label montserrat" htmlFor="flexCheckDefault">
                                  Accepter <a href="/#/CGU" className="text-dark font-weight-bolder montserrat"> Conditions </a>
                                </label>
                              </div>
                              <div className="text-center">
                                <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">S'inscrire</button>
                              </div>
                              <p className="text-sm mt-3 mb-0 montserrat">Vous avez déjà un compte ? <a href="#/login" className="text-dark font-weight-bolder">Se connecter</a></p>
                            </form>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          </section>
    )
  }