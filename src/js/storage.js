class Storage {
    constructor(){
        this.city;
    }

    getCityFromStorage(){
        this.city = localStorage.getItem('city');

        return this.city;
    }

    setCityToStorage(city){
        localStorage.setItem('city', city);
    }
}