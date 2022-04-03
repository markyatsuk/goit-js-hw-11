import PicturesApiService from './fetchAPI.js';
// import { OpenModalSimpleLightbox } from './simpleLightbox.js';
import {appendPicturesMarkup, clearPage } from './picturesMarkup.js';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix, { Notify } from 'notiflix';
// Дополнительный импорт стилей


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

async function onSearch(e){
    e.preventDefault();
    picturesApiService.query = e.currentTarget.elements.query.value;
    if(picturesApiService.query.trim() === ''){ //не відправляємо запит по порожньому інпуту, або інпуту заповненому пробілами
        Notiflix.Notify.failure("Please enter the request.");
        return;
    }
    picturesApiService.resetPage(); 
    refs.inputEl.value = '';
    try{
        const dataPictures = await picturesApiService.fetchPictures(); 
        const dataInf = dataPictures.data.hits;
            if(dataPictures.data.totalHits == 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
             
            else{
                if(dataPictures.data.totalHits > 40){
                    refs.loadMore.hidden = false; //показуємо кнопку лише запит складається більше ніж з 40 елементів
                    refs.loadMore.classList.add('load-more-styles');
                }
                counter = 1;
                refs.titleEl.classList.add("is-hidden");
                Notiflix.Notify.info(`Hooray! We found ${dataPictures.data.totalHits} images.`);
                clearPage();
                appendPicturesMarkup(dataInf);
            }
    }
    catch(error){
        console.log(error);
    };
    
};

async function onLoadMore(){
    
        try{
            const dataPictures = await picturesApiService.fetchPictures(); 
            const dataInf = dataPictures.data.hits;
            if(counter*40 >= dataPictures.data.totalHits){
                refs.loadMore.hidden = true;
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                refs.loadMore.classList.remove('load-more-styles');

            }
            else if(dataInf.length < 40){//приховуємо кнопку дозагрузки, якщо зображень більше немає
                appendPicturesMarkup(dataInf);
                counter++;      
                refs.loadMore.hidden = true;
                refs.loadMore.classList.remove('load-more-styles'); 
            }
            else{ 
                appendPicturesMarkup(dataInf);
                counter++; //conter тут тому що, якщо вносити у запит html, то знаходить 56 зображень, але після перших 40, щоб вын давав можливысть догрузити ще 16
            }
        }
        catch(error){
            console.log(error);
        };
};

export { refs };

//lightbox
// function onGalleryClick(event){
//     event.preventDefault();
//     const isImgEl = event.target.classList.contains("gallery__image");

//     if(!isImgEl){
//         return;
//     }

//     OpenModalSimpleLightbox();
// };




// function createImgCardsMarkup(galleryItems){
    
//     return galleryItems.map(({preview, original, description}) => {
//         return   `
//         <a class="gallery__item" href="${original}">
//             <img class="gallery__image" src="${preview}" alt="${description}" />
//         </a>
//         `;
//     }).join('');
    
// };

