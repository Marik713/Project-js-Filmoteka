import './refChangeHeader';
import './localStorage'
import filmService from './apiService';
import renderFilms from './renderFilms';
import Pagination from './pagination'

async function topFilms() {
    renderFilms(await filmService.getPopularFilms())
};

function getGallery() {
    if (refs.galleryList.children.length > 0) {
        refs.galleryList.innerHTML = '';
        topFilms()
        Pagination.init(filmService.getFilmsPagination());
    } else {
        topFilms()
        Pagination.init(filmService.getFilmsPagination());
    }
}

getGallery();