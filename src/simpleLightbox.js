import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css'

function openModalSimpleLightbox(){
    let simpleLightbox = new SimpleLightbox('.gallery a',
        {
            captionSelector: 'img',
            captionType: 'attr',
            captionsData: 'alt',
            animationSpeed: 150,
            captionPosition: 'bottom',
            captionDelay: 250,
            enableKeyboard: true,  
        });
        simpleLightbox.open();
};

export { openModalSimpleLightbox };