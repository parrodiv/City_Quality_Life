class UI {
  constructor() {
    this.inputText = document.getElementById('search-input');
    this.description = document.getElementById('description');
    this.chart = document.getElementById('chart');
    this.overall = document.getElementById('overall');
    this.compareCities = document.getElementById('compare-cities-chart');
  }

    showCity1(results) {
        //cancello l'input search
        this.inputText.value = '';

        //modifico il cityName in stampato per il titolo della descrizione
        let cityName = results.cityName
                        .toUpperCase()
                        .replaceAll('-', ' ');

        console.log(results);

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
                <h3>${cityName}</h3>
                <p class="card-text"> ${results.citySummary}</p>
            </div>
            `;
        
        //rendo visibile il div#descriprion
        this.description.style.display = 'block';

    
        console.log(results.cityScores);

        //raggruppo in array i punteggi cosi quando li metto nel grafico ho il dataset già pronto
        const scores_city1 = results.cityScores.map( score => {
            return `${Math.round(score.score_out_of_10)}`
        })

        //raggruppo in array le categorie cosi quando li metto nel grafico ho il dataset già pronto
        const categories_city1 = results.cityScores.map( category => {
            return `${category.name}`;
        })

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
        this.showChart1(categories_city1, scores_city1);
        this.chart.style.display = 'block';
        

       //CARD COMPARE CITY FORM 
        this.compareCities.innerHTML = `
            <div class="text">Do you want to compare <b>${cityName.toUpperCase()}</b> with anoter city?</div>
            <form id="compareForm">
                <input type="text" id="search-input2" placeholder="Search for a city to compare with" />
                <button class="search-btn compare-btn" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        `;
        //rendo visibile il div#compare-cities
        this.compareCities.style.display = 'block'; 
    }

    showChart1(categories_city1, scores_city1){
        //CHART SINGOLA CITTA'
        const ctx = document.getElementById('myChart1').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories_city1,
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

    showChart2(results){
        //cancello l'input search
        this.inputText.value = '';

        console.log(results);

    }

    showAlert(message){
        this.clearAlert();
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger');
        div.append(document.createTextNode(message));
        const container = document.querySelector('.container');
        //search box, posizione in cui inseriremo prima (child)
        const search = document.querySelector('.search-container');
        container.insertBefore(div, search);

        
        this.clearCity();


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
 
    clearCity(){
        this.description.style.display= 'none';
        this.chart.style.display = 'none';
        this.overall.style.display = 'none';
    }
}
//Esporto module ed inizializzo la classe UI
export const ui = new UI();
