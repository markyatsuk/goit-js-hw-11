import PicturesApiService from './fetchAPI.js';
import {appendPicturesMarkup, clearPage } from './picturesMarkup.js';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';

const refs = {
    form: document.querySelector(".search-form"),
    inputEl: document.querySelector("input"),
    buttonEl: document.querySelector("button[type='submit']"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more"),
    titleEl: document.querySelector(".greetings"),
}

const picturesApiService = new PicturesApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

refs.loadMore.hidden = true;

function onSearch(e){
    e.preventDefault();
    refs.loadMore.hidden = false;
    refs.titleEl.classList.add("is-hidden");
    picturesApiService.query = e.currentTarget.elements.query.value;
    picturesApiService.resetPage();
    refs.inputEl.value = '';
    picturesApiService.fetchPictures().then(hits => {
        if(hits.length == 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        else {
            clearPage();
            appendPicturesMarkup(hits);
        }
    });
}

function onLoadMore(){
    picturesApiService.fetchPictures().then(appendPicturesMarkup);
}


export { refs };