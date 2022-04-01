//import bootstrap from node-modules
import 'bootstrap/dist/css/bootstrap.min.css';


//import css files
import "../assets/css/common.css";
import "../assets/css/desktop.css";
import "../assets/css/tablet.css";
import "../assets/css/mobile.css";

import "animate.css";

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
searchForm.addEventListener('submit', (e) => {
    ui.showLoading(1);
    setTimeout(getCity_1, 1000)
 
    e.preventDefault();
})

function getCityOnLoaded(){
    //init CityData class
    const cityData = new CityData(storage.getCityFromStorage());
    cityData.getCity()
        .then( results => {
            ui.showCity1(results)
            //ottengo l'elemento compareForm dopo il caricamento della pagina in caso ci sia la città salvata nel Local Storage per far avviare la seconda ricerca della città di comparazione 
            getCompareFormEvent();
        })
        .catch( err => {
            console.log(`Error: ${err.message}`);     
        })
}

function getCity_1() {
    let city = document.getElementById('search-input').value;

    //set city to localStorage
    storage.setCityToStorage(city);

    //init CityClass 
    const cityData = new CityData(city);
    //chiamo la funzione che mi estrae la città dal API e che ritorna l'oggetto con le info che mi servono
    
    cityData.getCity()
        .then(results => {
            ui.showCity1(results);
            //una volta ricercata la città ottengo l'elemento compareForm per far avviare la seconda ricerca della città di comparazione, devo avviare la funzione dopo lo showCity1 perchè il compareForm viene aggiunto dal js e quindi inserito nel DOM dopo che la pagina viene caricata
            getCompareFormEvent();
        })
        .catch( err => {
            console.log(`Error city: ${err.message}`);
            if (city === ''){
                ui.showAlert('Please insert a city', '.container', '.search-container');
                ui.clearLoading(1);
            }else {
                ui.showAlert('City not found || PS: search a city in english', '.container', '.search-container');
                ui.clearLoading(1);
            }
        })
}

function getCompareFormEvent(){
    const compareForm = document.getElementById('compareForm')
    compareForm.addEventListener('submit', (e) => {
        e.preventDefault();
        ui.showLoading(2);
        setTimeout(getCity_2, 1000)
    });
}

function getCity_2(){
    let city = document.getElementById('search-input2').value;

    const cityData2 = new CityData(city);
        cityData2.getCity()
            .then( results2 => {
              console.log(results2);
              ui.showCity2(results2);
            }) 
            .catch( err => {
                console.log(`Error city: ${err.message}`);
                if(city === '') {
                    ui.showAlert('Please Insert a City', '.compareCitiesContainer', '.text') 
                    ui.clearLoading(2);
                } else{
                    ui.showAlert('City not found', '.compareCitiesContainer', '.text')
                    ui.clearLoading(2);
                }
            })
    
}

       

    








 