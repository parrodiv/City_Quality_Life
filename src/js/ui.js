class UI {
  constructor() {
    this.inputText = document.getElementById('search-input');
    this.description = document.getElementById('description');
    this.chart = document.getElementById('chart');
    this.overall = document.getElementById('overall');
  }

    showData(results) {
        //cancello l'input search
        this.inputText.value = '';

        //modifico il cityName perchè altrimenti uscirebbe con il trattino per la formattazione API
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

        //GRAFICO
        console.log(results.cityScores);

        //raggruppo in array i punteggi cosi quando li metto nel grafico ho il dataset già pronto
        const scores = results.cityScores.map( score => {
            return `${Math.round(score.score_out_of_10)}`
        })

        //raggruppo in array le categorie cosi quando li metto nel grafico ho il dataset già pronto
        const categories = results.cityScores.map ( category => {
            return `${category.name}`;
        })

        this.chart.innerHTML = `
        <div class="card-header">
            Chart of scores
         </div>
        <div class="card-body chart-container">
            <canvas id="myChart" width="10" height="10"></canvas>
        </div>
        `
        //rendo visibile il div#chart
        this.chart.style.display = 'block';
        

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'score',
                    data: scores,
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
