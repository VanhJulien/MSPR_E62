// J'importe les dépendances nécessaires (React, Notifications, Graphique, Icone)

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactBSAlert from "react-bootstrap-sweetalert";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Modal,
} from "reactstrap";
import Select from 'react-select';
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { ImagePicker } from 'react-file-picker'
library.add(faCircle);


const Plantes = () => { 

  // Je crée des variables dynamiques avec le hook useState.
  //  Je pourrai ainsi changer leur valeur, ce qui actualisera la page automatiquement sans chargement
  
  // Sert pour actualiser le contenu affiché
  const [refresh, setRefresh] = useState() 

  // Stocke les plantes pour exploiter les données de la BDD
  const [plantes, setPlantes] = useState([]); 

  // Gère l'affichage des notifications
  const [alert, setAlert] = useState(); 

  // Gère l'affichage de la Pop-up d'ajout de plante
  const [modalAddPlant, setModalAddPlant] = useState(false);

  // Gère l'affichage de la Pop-up d'ajout de lieu
  const [modalAddPlace, setModalAddPlace] = useState(false);

  // Gère l'affichage de la Pop-up de modification/suppression de plante
  const [modalChange, setModalChange] = useState(false);

  // Gère l'affichage de la Pop-up de graphique d'évolution de plante
  const [modalChart, setModalChart] = useState(false);

  // Stocke les informations du plante en cours de modification/suppression
  let [currentPlante, setCurrentPlante] = useState({
    id: undefined,
    Specie: undefined,
    Status: undefined,
    Picture: undefined
  });

  // Stocke les informations du plante en cours de création
  let [newPlante, setNewPlante] = useState({
    id: undefined,
    Specie: undefined,
    Status: undefined,
    Picture: undefined
  });

  // Stocke les options possibles d'état de plante 
  let [options, setOptions] = useState([
    {value: "Germination", label: "Germination"},
    {value: "Croissance", label: "Croissance"},
    {value: "Floraison", label: "Floraison"},
    {value: "Fructification", label: "Fructification"},
    {value: "Fanée", label: "Fanée"}
  ])

  // Stocke les options possibles de lieu
  let [optionsPlace, setOptionsPlace] = useState([])

  // Stocke l'option d'état de plante actuellement sélectionnée
  const [selectedOptionStatus, setSelectedOptionStatus] = useState({value: "NoStatus", label: "Choisissez une option"})

  // Stocke l'option de lieu actuellement sélectionnée
  const [selectedOptionPlace, setSelectedOptionPlace] = useState({value: "NoPlace", label: "Choisissez une option"})

  let addPlacePlant;

  const [errorAddPlant, setErrorAddPlant] = useState(null)

  // Exécute la fonction fetchPlantes() au chargement de la page
  useEffect(() => {
    fetchPlantes()
    fetchPlaces()
  }, [])

  // Exploite l'API pour récupérer les plantes en BDD
  const fetchPlantes = async () => {
  
    try {
      // Requête HTTP GET à l'API avec la librairie Axios
      await axios
        .get("http://localhost:8000/api/plants")
        // Stocke les plantes dans la variable plantes
        .then((response) => {setPlantes(response.data["hydra:member"])} )
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
    }}

  // Exploite l'API pour récupérer les plantes en BDD
  const fetchPlaces = async () => {
  
    try {
      // Requête HTTP GET à l'API avec la librairie Axios
      await axios
        .get("http://localhost:8000/api/places")
        // Stocke les lieux dans la variable places
        .then((response) => response.data["hydra:member"].map(Place => (optionsPlace.push({value: Place.id, label: Place.address}))))
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
    }}

  // Ajout d'une plante en BDD avec les informations du formulaire
  const addPlant = () => {
    setErrorAddPlant(null)
    if (selectedOptionPlace.value == "NoPlace"){
      addPlacePlant = null
      setErrorAddPlant("Error !")
    } else {
      addPlacePlant = "/api/places/" + selectedOptionPlace.value
    }
    if (selectedOptionStatus.value == "NoStatus" || newPlante.Specie == undefined) {
      setErrorAddPlant("Error !")
    }
    // Requête HTTP POST à l'API avec la librairie Axios
    try {
      axios.post("http://localhost:8000/api/plants", {
        Place: addChambreLit,
          Patient: addPatientLit
      })
      // Notification d'ajout réussi
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {
            setAlert(null); 
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Plante ajoutée !
        </ReactBSAlert>
      ))
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
      // Notification d'erreur survenue
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {
            setAlert(null);
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
    }
  }

  // Ajout d'un lieu en BDD avec les informations du formulaire
  const addPlace = () => {
    // Requête HTTP POST à l'API avec la librairie Axios
    try {
      axios.post("http://localhost:8000/api/place", {
        // à écrire
      })
      // Notification d'ajout réussi
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {
            setAlert(null); 
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Lieu ajouté !
        </ReactBSAlert>
      ))
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
      // Notification d'erreur survenue
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {
            setAlert(null);
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
    }
  }
  
  // Stocke les informations du plante que l'on souhaite modifier dans currentPlante
  // Cela permettra d'avoir une valeur par défaut dans les champs.
  // Puis, affiche la Pop-up de modification/suppression
  const handleModify = (plante) => {
    // currentPlante.id = plante.id
    // currentPlante.Nom = plante.nom
    // setSelectedOption({label:plante.type, value: plante.type})
    // à écrire
    setModalChange(true) // Affiche la Pop-up
  }

  // Modification d'une plante en BDD avec les informations du formulaire
  const changePlante = () => {
    const headers = { 'Content-Type': 'application/merge-patch+json' }
    // Requête HTTP PATCH à l'API avec la librairie Axios
    try {
      axios.patch("http://localhost:8000/api/plantes/" + currentPlante.id, {
        // à écrire
      }, 
      {headers} )
      // Notification de modification réussie
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => 
            {setAlert(null);
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Plante modifiée !
        </ReactBSAlert>
      ))
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
      // Notification d'erreur survenue
      setAlert(
        <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {
            setAlert(null); 
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
      )
    }
  }

  // Alerte de confirmation pour supprimer un plante
  const deletePlanteSweetAlert = () => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "0px" }}
        title="Are you sure?"
        onConfirm={deletePlante}
        onCancel={() =>
          setAlert(null)
        }
        confirmBtnCssClass="danger"
        cancelBtnBsStyle="btn-secondary"
        confirmBtnText="Yes, delete it"
        cancelBtnText="Cancel"
        showCancel
        btnSize=""
      >
        You won't be able to revert this!
      </ReactBSAlert>
    )
  };

  // Suppression d'une plante en BDD
  const deletePlante = () => {
    try {
      // Requête HTTP DELETE à l'API avec la librairie Axios
      axios.delete("http://localhost:8000/api/plantes/" + currentPlante.id)
      // Notification de suppression réussie
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {
            setAlert(null);
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          plante supprimé ! 
        </ReactBSAlert>
      ))
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
      // Notification d'erreur survenue
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {
            setAlert(null); 
            window.location.reload();
          }} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
    }
  }

  // Le contenu du return est affiché sur la page
  return (
    <>
    {/* Affiche une alerte si la variable alert est définie. Sinon, n'affiche rien. */}
      {alert}
      {/* Tableau d'affichage des plantes */}
      <div className="PlanteArray">
        <table id="plantesTable" className="table table-dark">
          <thead>
            {/* Première ligne */}
            <tr>
              {/* Colonnes contenant les titres */}
              <th>Identifiant</th>
              <th>Espèce</th>
              <th>État</th>
              <th>Emplacement</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {/* Pour chaque plante, construis une nouvelle ligne du tableau */}
            {plantes.map(plante => (
              <tr key={plante.id + "00"}>
                {/* Affiche l'identifiant dans la colonne correspondante */}
                <td key={plante.id + "0"}>{plante.id}</td>
                {/* Affiche l'espècedans la colonne correspondante */}
                <td key={plante.id + "1"}>{plante.specie}</td>
                <td key={plante.id + "2"}>{plante.status}</td>
                <td key={plante.id + "3"}>{plante.place.address}</td>
                <td key={plante.id + "4"}><Button color="success" onClick={() => handleModify(module)}>Modifier / Supprimer</Button></td>
              </tr>))}
            {!plantes && 
            <tr>
            <td>Aucune donnée</td>
            <td>Aucune donnée</td>
            <td>Aucune donnée</td>
            <td>Aucune donnée</td>
            <td>Aucune donnée</td>
          </tr>}
          </tbody>
        </table>
      </div>
      <div>
        <span>
          {/* Bouton d'ajout de plante qui définit modalAddPlant à true et donc affiche la Pop-up d'ajout */}
          <Button className="centre" color="success" onClick={() => setModalAddPlant(true)}>Ajouter une Plante</Button>
          {/* Bouton d'ajout de lieu qui définit modalAddPlace à true et donc affiche la Pop-up d'ajout */}
          <Button className="centre" color="success" onClick={() => setModalAddPlace(true)}>Ajouter un Lieu</Button>
        </span>
      </div>
      {/* Pop-up de modification de plante. Est affichée lorsque modalChange = true (défini par handleModify) */}
      <Modal
        isOpen={modalChange}
        toggle={() => setModalChange(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            {/* Formulaire de modification */}
            <Form className="edit-event--form">
              <FormGroup>
                {/* Champ de modification du nom */}
                <label className="form-control-label">Nom de la plante</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Nom du plante"
                  type="text"
                  onChange={e => {
                    currentPlante.Nom = e.target.value // à chaque modification du champ de texte, actualise la valeur de currentPlante.Nom pour la modification en BDD
                  }
                  }
                  defaultValue={currentPlante.Nom}
                />
              </FormGroup>
              {/* Champ de l'état avec une barre déroulante */}
              <FormGroup>
                <label className="form-control-label">État</label>
                <Select
                  options={options}
                  onChange={setSelectedOptionStatus} // à chaque modification du champ de type,  actualise la valeur de selectedOption qui contient l'option choisie pour l'ajout en BDD
                  name="EtatPlante"
                  defaultValue={selectedOptionStatus}
                  value={selectedOptionStatus}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#8dd7cf',
                      primary: '#c3cfd9'

                    },
                  })}
                />
              </FormGroup>
              <input className="edit-event--id" type="hidden" />
            </Form>
          </div>
          <div className="modal-footer">
            {/* Bouton modifier qui appelle la fonction changePlante pour effectuer la modification */}
            <Button color="primary" onClick={changePlante} >
              Modifier
            </Button>
            {/* Bouton modifier qui appelle la fonction deletePlanteSweetAlert pour effectuer la suppression */}
            <Button
              color="danger"
              onClick={deletePlanteSweetAlert}
            > 
              Supprimer
            </Button> 
            {/* Bouton qui ferme la Pop-up */}
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalChange(false)}
            >
              Close
            </Button>
          </div>

      </Modal>

      {/* Pop-up d'ajout de plante. Est affichée lorsque modalAddPlant = true (lorsque le bouton Ajouter est cliqué) */}
      <Modal
        isOpen={modalAddPlant}
        toggle={() => setModalAddPlant(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            {/* Formulaire d'ajout */}
            <Form className="edit-event--form">
              {/* Champ de l'espèce */}
              <FormGroup>
                <label className="form-control-label">Espèce</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Espèce"
                  type="text"
                  onChange={e => {
                    newPlante.Specie = e.target.value // à chaque modification du champ de texte, actualise la valeur de newPlante.Nom pour l'ajout en BDD
                  }
                  }
                />
              </FormGroup>
              {/* Champ de l'état avec une barre déroulante */}
              <FormGroup>
                <label className="form-control-label">État</label>
                <Select
                  options={options}
                  onChange={setSelectedOptionStatus} // à chaque modification du champ de type,  actualise la valeur de selectedOption qui contient l'option choisie pour l'ajout en BDD
                  name="EtatPlante"
                  defaultValue={selectedOptionStatus}
                  value={selectedOptionStatus}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#8dd7cf',
                      primary: '#c3cfd9'

                    },
                  })}
                />
              </FormGroup>
              {/* Champ du lieu avec une barre déroulante */}
              <FormGroup>
                <label className="form-control-label">Lieu</label>
                <Select
                  options={optionsPlace}
                  onChange={setSelectedOptionPlace} // à chaque modification du champ de type,  actualise la valeur de selectedOption qui contient l'option choisie pour l'ajout en BDD
                  name="placePlante"
                  defaultValue={selectedOptionPlace}
                  value={selectedOptionPlace}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#8dd7cf',
                      primary: '#c3cfd9'

                    },
                  })}
                />
              </FormGroup>
              <ImagePicker
                extensions={['jpg', 'jpeg', 'png']}
                dims={{minWidth: 100, maxWidth: 600, minHeight: 100, maxHeight: 600}}
                onChange={base64 => {newPlante.Picture = base64; setRefresh("ah"); console.log(base64)}}
                onError={errMsg => (console.log(errMsg))}
              >
                <button>
                  Ajouter une image
                </button>
              </ImagePicker>
              {newPlante.Picture != undefined && <div>Image sélectionnée</div>}
              {errorAddPlant != null && <div class="text-danger">Champ manquant !</div>}
              <input className="edit-event--id" type="hidden" />
            </Form>
          </div>
          <div className="modal-footer">
            {/* Bouton ajouter qui appelle la fonction addPlant pour effectuer l'ajout */}
            <Button color="primary" onClick={addPlant} >
              Ajouter 
            </Button>
            {/* Bouton qui ferme la Pop-up */}
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalAddPlant(false)}
            >
              Close
            </Button>
          </div>

      </Modal>
      {/* Pop-up d'ajout de lieu. Est affichée lorsque modalAddPlace = true (lorsque le bouton Ajouter un Lieu est cliqué) */}
      <Modal
        isOpen={modalAddPlace}
        toggle={() => setModalAddPlace(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            {/* Formulaire d'ajout */}
            <Form className="edit-event--form">
              {/* Champ de l'espèce */}
              <FormGroup>
                <label className="form-control-label">Espèce</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Espèce"
                  type="text"
                  onChange={e => {
                    newPlante.Specie = e.target.value // à chaque modification du champ de texte, actualise la valeur de newPlante.Nom pour l'ajout en BDD
                  }
                  }
                />
              </FormGroup>
              {/* Champ du type avec une barre déroulante */}
              <input className="edit-event--id" type="hidden" />
            </Form>
          </div>
          <div className="modal-footer">
            {/* Bouton ajouter qui appelle la fonction addPlace pour effectuer l'ajout */}
            <Button color="primary" onClick={addPlace} >
              Ajouter 
            </Button>
            {/* Bouton qui ferme la Pop-up */}
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalAddPlace(false)}
            >
              Close
            </Button>
          </div>

      </Modal>
    </>
  )
};

export default Plantes;