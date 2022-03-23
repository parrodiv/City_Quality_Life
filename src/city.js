 export class CityData {
  constructor(city) {
    this.city = city;
  }

  //Fetch city from API
  async getCity() {
    //formatto il city rimpiazzando gli spazi vuoti tra le parole con le -
    let cityName = this.city.toLowerCase().trim().replaceAll(' ', '-');

    //fetch city
    const responseCity = await fetch(
      `https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`
    );
    console.log(cityName);
    const cityFetched = await responseCity.json();

    console.log(cityFetched);

    // Descrizione città
    const citySummary = cityFetched.summary;
    // Punteggi città
    const cityScores = cityFetched.categories;
    // Punteggio complessivo
    const cityOverallScore = cityFetched.teleport_city_score;


    //fetch img of city
    const responseImgCity = await fetch(
      `https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`
    );
    const imgCityFetched = await responseImgCity.json();

    const imgWeb = imgCityFetched.photos[0].image.web;

    
    return {
        cityName,
        citySummary,
        cityScores,
        cityOverallScore,
        imgWeb,
    }
  }
}

