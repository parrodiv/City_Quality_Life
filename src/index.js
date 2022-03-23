//import bootstrap from node-modules
import 'bootstrap/dist/css/bootstrap.min.css';

//import css files
import "../assets/css/common.css";
import "../assets/css/desktop.css";
import "../assets/css/tablet.css";
import "../assets/css/mobile.css";

//import Storage module
import { storage } from "./storage";
//import UI module
import { ui } from "./ui";
//import CityData module
import { CityData } from "./city";



//EVENTS

//CONTENT LOADED EVENT - init City class in caso di dato nel localStorage
document.addEventListener('DOMContentLoaded', () => {
    //se il localStorage non è vuoto
    if (storage.getCityFromStorage() !== null){
        //init CityData class
        const cityData = new CityData(storage.getCityFromStorage());
        cityData.getCity()
            .then( results => ui.showData(results))
            .catch( err => {
                console.log(`Error: ${err.message}`);     
            })
    } else null;
})

//SUBMIT EVENT - Ottengo city name ed i vari dati
document.getElementById('submit').addEventListener('submit', (e) => {
    e.preventDefault();
    let city = document.getElementById('search-input').value;

    //set city to localStorage
    storage.setCityToStorage(city);

    //init CityClass 
    const cityData = new CityData(city);
    //chiamo la funzione che mi estrae la città dal API e che ritorna l'oggetto con le info che mi servono
    cityData.getCity()
        .then(results => {
            ui.showData(results);
        })
        .catch( err => {
            console.log(`Error city: ${err.message}`);
            if (city === ''){
                ui.showAlert('Please insert a city');
            }else {
                ui.showAlert('City not found');
            }
        })
})
 