//import axios
import axios from 'axios';
//import lodash
import _ from 'lodash';

export class CityData {
  constructor(city) {
    this.city = city;
  }

  //Fetch city from API
  async getCity() {
        //formatto il city rimpiazzando gli spazi vuoti tra le parole con le -
        let cityName = this.city.toLowerCase().trim().replaceAll(' ', '-');

        //fetch city
        const responseCity = await axios.get(
          `https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`
        );

        // Descrizione città
        const citySummary = _.get(responseCity, 'data.summary');
        // Punteggi città
        const cityScores =  _.get(responseCity, 'data.categories');
        // Punteggio complessivo
        const cityOverallScore =  _.get(responseCity, 'data.teleport_city_score');


        //fetch img of city
        const responseImgCity = await axios.get(
          `https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`
        );
      

        const imgWeb = _.get(responseImgCity, 'data.photos[0].image.web');

    return {
        cityName,
        citySummary,
        cityScores,
        cityOverallScore,
        imgWeb,
    }
  }
}

