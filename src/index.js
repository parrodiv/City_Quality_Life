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

const searchForm = document.getElementById('searchForm');



//EVENTS

//CONTENT LOADED EVENT
document.addEventListener('DOMContentLoaded', () => {
    //se il localStorage non è vuoto
    if (storage.getCityFromStorage() !== null){
        getCityOnLoaded();

    
    }
})

//SUBMIT EVENT ON SEARCH FORM- Ottengo city name ed i vari dati
searchForm.addEventListener('submit', getCity_1);
// compareForm.addEventListener('submit', getCity_2);


function getCityOnLoaded(){
    //init CityData class
    const cityData = new CityData(storage.getCityFromStorage());
    cityData.getCity()
        .then( results => {
            ui.showCity1(results)
            //ottengo l'elemento compareForm dopo il caricamento della pagina in caso ci sia salvata la città nel Local Storage per far avviare la seconda ricerca della città di comparazione 
            getCompareFormEvent();
        })
        .catch( err => {
            console.log(`Error: ${err.message}`);     
        })
}

function getCity_1(e) {
    e.preventDefault();
    let city = document.getElementById('search-input').value;

    //set city to localStorage
    storage.setCityToStorage(city);

    //init CityClass 
    const cityData = new CityData(city);
    //chiamo la funzione che mi estrae la città dal API e che ritorna l'oggetto con le info che mi servono
    cityData.getCity()
        .then(results => {
            ui.showCity1(results);
            //una volta ricercata la città ottengo l'elemento compareForm per far avviare la seconda ricerca della città di comparazione
            getCompareFormEvent();
        })
        .catch( err => {
            console.log(`Error city: ${err.message}`);
            if (city === ''){
                ui.showAlert('Please insert a city');
            }else {
                ui.showAlert('City not found');
            }
        })
}

function getCompareFormEvent(){
    const compareForm = document.getElementById('compareForm')
    compareForm.addEventListener('submit', getCity_2);
}

function getCity_2(e){
    e.preventDefault();
    let city = document.getElementById('search-input2').value;

    const compareForm = document.getElementById('compareForm') === null ? "" : document.getElementById('compareForm')

    const cityData2 = new CityData(city);
        cityData2.getCity()
            .then( results2 => {
              console.log(results2);
            }) 
    
}

       

    








 