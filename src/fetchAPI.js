export default class PicturesApiService {
    constructor(){
        this.BASE_URL = "https://pixabay.com/api/";
        this.KEY = "?key=25846994-f61f238b1642b7912a0ecf7e9";
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 'per_page=40';
        this.image_type = "image_type=photo";
        this.orientation = "orientation=horizontal";
        this.safesearch = "safesearch=true";
    }
    
    fetchPictures(){
        const options = {
            fields: "webformatURL,largeImageURL,tags,likes,views,comments,downloads",
        };


        return fetch(`${this.BASE_URL}?key=${this.KEY}&${this.searchQuery}&${this.image_type}&${this.orientation}&${this.safesearch}&page=${this.page}&${this.per_page}`, options)
        .then( r => r.json())
        .then( data => {
            this.page += 1;
            return data.pictures;
        })
    }
    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchQuery;
    }
    set query(newQuery){
        this.searchQuery = newQuery;
    }
}

