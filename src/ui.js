class UI {
  constructor() {
    this.inputText1 = document.getElementById('search-input');
    this.description = document.getElementById('description');
    this.chart = document.getElementById('chart1');
    this.overall = document.getElementById('overall');
    this.compareCities = document.getElementById('compare-cities-chart');
   
    //DICHIARO LE VARIABILI GENERICHE DELLE INFORMAZIONI CHE MI SERVIRANNO PER IL GRAFICO DI COMPARAZIONE
    //QUESTE VARIABILI VENGONO POI ASSEGNATE NELLA FUNZIONE showCity1/showCity2
    this.cityName1;
    this.categories_city;
    this.scores_city1;
    this.headerComparison;
    this.chart2;
  }

    showLoading(loadingNumber){
        //nel index.html abbiamo 2 loading uno con id = "loading1" e l'altro con id= "loading2"
        document.getElementById(`loading${loadingNumber}`).style.display = 'block';

        //imposto la condizione per cancellare i results in base al fatto che la ricerca venga fatta per la città1 o la città2
        if(loadingNumber === 1){
            this.clearCity(1) 
        } else {
            this.clearCity(2);   
        }
    }

    clearLoading(loadingNumber){
        document.getElementById(`loading${loadingNumber}`).style.display = 'none';
    }

    showCity1(results) {
        //cancello l'input search
        this.inputText1.value = '';

        //cancello loading1
        this.clearLoading(1);

        //modifico il cityName in stampato per il titolo della descrizione
        let cityName1 = results.cityName
                        .toUpperCase()
                        .replaceAll('-', ' ');
        this.cityName1 = cityName1;

        // console.log(results);

        //OVERALL
        this.overall.innerHTML = `
            Overall score: <span>${results.cityOverallScore.toFixed(2)} / 100</span>
        `;
        this.overall.style.display = 'flex';
        this.overall.style.justifyContent = 'space-between';
        this.overall.style.alignItems = 'center';

        // DESCRIZIONE E FOTO CITTA'
        this.description.innerHTML = `
            <img src="${results.imgWeb}" class="card-img-top">
            <div class="card-body">
                <h3>${cityName1}</h3>
                <p class="card-text"> ${results.citySummary}</p>
            </div>
            `;
        
        //rendo visibile il div#descriprion
        this.description.style.display = 'block';

    
        // console.log(results.cityScores);

        //raggruppo in array i punteggi cosi quando li metto nel grafico ho il dataset già pronto
        const scores_city1 = results.cityScores.map( score => {
            return `${Math.round(score.score_out_of_10)}`
        })

        //rendo l'array scores visibile anche all'esterno della funzione, per poi accedervi nel grafico di comparazione
        this.scores_city1 = scores_city1;

        //raggruppo in array le categorie cosi quando li metto nel grafico ho il dataset già pronto
        const categories_city = results.cityScores.map( category => {
            return `${category.name}`;
        })

        //rendo l'array categories visibile anche all'esterno della funzione, per poi accedervi nel grafico di comparazione
        this.categories_city = categories_city;

        // GRAFICO SINGOLA CITTA'
        this.chart.innerHTML = `
            <div class="card-header">
                Chart of scores
            </div>
            <div class="card-body chart-container">
                <canvas id="myChart1" width="10" height="10"></canvas>
            </div>
        `
        //rendo visibile il div#chart
        this.showChart1(categories_city, scores_city1);
        this.chart.style.display = 'block';
        
        //chiamo la funzione che mi rende visibile il div#compare-cities
        this.showCompareCitiesForm(cityName1);
    }

    showCompareCitiesForm(cityName){
        //CARD COMPARE CITY FORM 
        this.compareCities.innerHTML = `
            <div class="text">Do you want to compare <b>${cityName.toUpperCase()}</b> with anoter city?</div>
            <form id="compareForm">
                <input type="text" id="search-input2" placeholder="Search for a city to compare with" />
                <button class="search-btn compare-btn" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <h3 id="headerComparison"></h3> 
            <div id="chart2"></div>
        `;
       
        // //ottengo il div#chart2
        const chart2 = document.getElementById('chart2');
        this.chart2 = chart2;
        //nascondo il div#chart2
        this.chart2.style.display = "none";

        //rendo visibile il div#compare-cities
        this.compareCities.style.display = 'block'; 
    }

    showCity2(results){
        this.inputText2 = document.getElementById('search-input2');
        this.inputText2.value = '';

        //cancello loading2
        this.clearLoading(2);


        //OTTENGO I DATI DELLA PRIMA CITTA' CHE MI SERVONO PER LA COMPARAZIONE DELLE DUE CITTA'
        const cityName1 = this.cityName1;
        const categories_city = this.categories_city;
        const scores_city1 = this.scores_city1;
        
        //OTTENGO I DATI DELLA SECONDA CITTA'
        const cityName2 = results.cityName
                        .toUpperCase()
                        .replaceAll('-', ' ');

        const scores_city2 = results.cityScores.map( score => {
            return `${Math.round(score.score_out_of_10)}`
        })

        //declare headerComparison variable
        const headerComparison = document.getElementById('headerComparison');
        this.headerComparison = headerComparison;

        this.headerComparison.innerHTML = `
            Comparison between ${cityName1} and ${cityName2}
        `;

        //ottengo il div#chart2
        const chart2 = document.getElementById('chart2');
        this.chart2 = chart2;
         //rendo visibile il chart
        this.chart2.style.display = "block";

        this.showChart2(categories_city, scores_city1, scores_city2, cityName2);
    }

    showChart1(categories_city, scores_city1){
        //CHART SINGOLA CITTA'
        const ctx = document.getElementById('myChart1').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories_city,
                datasets: [{
                    label: 'score',
                    data: scores_city1,
                    backgroundColor: [
                        '#000000',
                    ],
                    borderColor: [
                        '#F2F3F5',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        min:0,
                        max: 10
                    }
                }
            }
        });
    }


    showChart2(categories_city, scores_city1, scores_city2, cityName2 ){

        this.chart2.innerHTML = `
            <canvas id="myChart2"style="display: inline;"></canvas>
        `;

        //CHART2
        Chart.defaults.font.size = 14;
        const ctx = document.getElementById('myChart2').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: categories_city,
                datasets: [{
                    label: this.cityName1,
                    data: scores_city1,
                    backgroundColor: [
                        'rgba(0, 0, 0, 0.3)',
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 1)',
                    ],
                    borderWidth: 1
                },{
                    label: cityName2,
                    data: scores_city2,
                    backgroundColor:[
                        'rgba(0, 255, 255, 0.3)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        min:0,
                        max: 10,
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 18
                            }
                        }
                    },
                    title: {
                      display: true,
                    }
                }
            },
        })
    }
   

    showAlert(message, parentElClassName, childElClassName){
        this.clearAlert();
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger');
        div.append(document.createTextNode(message));
        const parentEl = document.querySelector(parentElClassName);
        //search box, posizione in cui inseriremo prima (child)
        const childEl = document.querySelector(childElClassName);
        parentEl.insertBefore(div, childEl);

        //imposto la condizione per eliminare il contenuto in caso di errore nel form di ricerca città
        //in base alla classe che viene presa in considerazione e quindi dove inserire l'alert indico gli elementi che devono essere cancellati in base a dove si verifica l'errore
        childElClassName === '.search-container' ? this.clearCity(1) : this.clearCity(2);

        //clear alert after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){ //if exists
            currentAlert.remove();
        }
    }
 
    clearCity(cityNumber){
        if (cityNumber === 1) {
            this.description.style.display= 'none';
            this.chart.style.display = 'none';
            this.overall.style.display = 'none'; 
            this.compareCities.style.display = 'none';
        } else if (cityNumber === 2 && this.headerComparison !== undefined){
            this.headerComparison.style.display = 'none';
            this.chart2.style.display = 'none';
        }
    }
}
//Esporto module ed inizializzo la classe UI
export const ui = new UI();
