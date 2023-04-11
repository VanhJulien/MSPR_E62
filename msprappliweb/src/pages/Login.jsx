import React, { useState } from "react";
import { useEffect } from 'react';

const Login = () => {

  return (
      <div className="bg-gray-200">
        <div className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100 FlexContainer"> 
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Connexion</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                  <form role="form">
                                    <label htmlFor="username" className="form-label mt-4 montserrat">
                                    Nom d'utilisateur
                                    </label>
                                    <input
                                      type="text"
                                      className={"form-control montserrat"}
                                      id="username"
                                      name="username"
                                      placeholder="Enter username"
                                      />
                                      <div className="form-group">
                                      <label htmlFor="password" className="form-label mt-4 montserrat">
                                        Mot de passe
                                      </label>
                                      <input
                                        type="password"
                                        className="form-control montserrat"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                      />
                                      </div>
                                      <div className="form-check form-switch montserrat">
                                        <input className="form-check-input" id=" customCheckLogin" type="checkbox" />
                                        <label className="form-check-label" htmlFor=" customCheckLogin">
                                          <span className="text-muted">Remember me</span>
                                        </label>
                                      </div>
                                      <div className="text-center">
                                        <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2"> Envoyer</button>
                                      </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      </div>
  );
};    
export default Login;

