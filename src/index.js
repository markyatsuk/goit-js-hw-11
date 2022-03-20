import PicturesApiService from './fetchAPI.js';
import {appendPicturesMarkup, clearPage } from './picturesMarkup.js';
import SimpleLightbox from "simplelightbox";
import Notiflix, { Notify } from 'notiflix';

const refs = {
    form: document.querySelector(".search-form"),
    inputEl: document.querySelector("input"),
    buttonEl: document.querySelector("button[type='submit']"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more"),
    titleEl: document.querySelector(".greetings"),
}

let counter = 1;
const picturesApiService = new PicturesApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

refs.loadMore.hidden = true;

function onSearch(e){
    e.preventDefault();
    refs.titleEl.classList.add("is-hidden");
    picturesApiService.query = e.currentTarget.elements.query.value;
    picturesApiService.resetPage();
    refs.inputEl.value = '';
    picturesApiService.fetchPictures().then((response) => {
        if(response.data.hits.length == 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        else {
            counter = 1;
            refs.loadMore.hidden = false;
            Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`)
            clearPage();
            appendPicturesMarkup(response.data.hits);
            if(counter*40 >= response.data.totalHits){
                refs.loadMore.hidden = true;
            }
        }
       
    });
}

function onLoadMore(){
    counter++;
    picturesApiService.fetchPictures().then(response => {
        
        if(counter*40 >= response.data.totalHits){
            refs.loadMore.hidden = true;
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }else{
            appendPicturesMarkup(response.data.hits);
        }
    });
    
    

}


export { refs };