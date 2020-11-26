import filmTempl from './templates/film-view.hbs';
import filmService from '../header/apiService';
import Pagination from '../header/pagination';
import { addToWatch, addToQueue, setActive, checkList, renderFilms, normalize } from '../header/localStorage'

function renderFilmInfo(filmName) {
    const markup = filmTempl(filmName);
    refs.filmViewSection.insertAdjacentHTML('beforeend', markup);
};

refs.galleryList.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    Pagination.clear();
    
    window.scrollTo({
        top: 100,
        behavior: "smooth"
    });
    if (e.target.tagName === "IMG") {
        refs.filmsSection.classList.add('is-visible');
    refs.filmViewSection.classList.remove('is-visible');
        await renderFilmInfo(await filmService.getFilmId(id));
        await addToWatch(id);
    await addToQueue(id);
    await setActive(e, Number(id));
    }
    if (e.target.tagName === "DIV") {
        const id = Number(e.target.nextElementSibling.dataset.id);
        console.log(id);
        const watchedList = JSON.parse(localStorage.getItem("Watch")) || [];
        const watchedQueue = JSON.parse(localStorage.getItem("Queue")) || [];
        const object = await filmService.getFilmId(id);
        
        if (refs.buttonWatched.classList.contains('is-active')) {
            console.log('hello');
            const nameWatch = "Watch";
            await  checkList(watchedList, object, nameWatch);
        const newWatchedList = await JSON.parse(localStorage.getItem("Watch")) || [];
        refs.galleryList.innerHTML = '';
        renderFilms(normalize(newWatchedList));
        }
        else {
            const nameWatch = "Queue";
            await  checkList(watchedQueue, object, nameWatch);
        const newQueuedList = await JSON.parse(localStorage.getItem("Queue")) || [];
        refs.galleryList.innerHTML = '';
        renderFilms(normalize(newQueuedList));
            
        }

        



    }
    
    
});