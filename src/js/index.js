//init Storage class
const storage = new Storage();
//int UI class
const ui = new UI();


//EVENTS

//CONTENT LOADED-init City class in caso di dato nel localStorage
document.addEventListener('DOMContentLoaded', () => {
    //se il localStorage non è vuoto
    if (localStorage.getItem('city') !== null){
        //init CityData class
        const cityData = new CityData(localStorage.getItem('city'));
        cityData.getCity()
            .then( results => ui.showData(results))
            .catch( err => {
                console.log(`Error: ${err.message}`);     
            })
    } else null;
})

//SUBMIT-Ottengo city name ed i vari dati
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
 