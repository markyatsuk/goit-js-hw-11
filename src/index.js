import PicturesApiService from './fetchAPI';

const refs = {
    form: document.querySelector(".search-form"),
    inputEl: document.querySelector("input"),
    buttonEl: document.querySelector("button[type='submit']"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more"),
}

const picturesApiService = new PicturesApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);



function onSearch(e){
    e.preventDefault();
    picturesApiService.query = e.currentTarget.elements.query.value;
    picturesApiService.resetPage();
    picturesApiService.fetchPictures().then( pictures => console.log(pictures));
}

function onLoadMore(){
    picturesApiService.fetchPictures().then( pictures => console.log(pictures));
}


