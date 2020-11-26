import filmService from '../header/apiService';
import Pagination from './pagination.js';
import renderFilms from './renderFilms';
import '../header/main';
import { spinerStart, spinerStop } from '../helpers/spiner';
import { renderLibraryHome, renderLibraryQueue } from './localStorage'

refs.searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    filmService.query = form.elements.query.value;
    openWarningMessage();
    Pagination.clear();
    refs.galleryList.innerHTML = '';
    if (filmService.query) {
        closeWarningMessage();
        refs.galleryList.innerHTML = '';
        filmService.resetPage();
        filmService.getFilms();
        renderFilms(await filmService.getFilms());
        if (refs.galleryList.children.length === 0) {
            Pagination.clear();
            refs.warningMessage.classList.remove('is-visible');
            refs.warningMessage.textContent = "Search result not successfull. Enter correct movie name and try again";
        }
    }
    form.reset();
});

refs.logo.addEventListener('click', () => {
    refs.teamSection.classList.add('is-visible');
    Pagination.clear();
    Pagination.init(filmService.getFilmsPagination());
    classListHome();
    setHomeActive();
});
refs.logo.addEventListener('click', async e => {
    refs.galleryList.innerHTML = '';
    renderFilms(await filmService.getPopularFilms());
});
refs.burger.addEventListener('click', clickOnBurger);
refs.navLinkLibrary.addEventListener('click', classListLibrary);
refs.navLinkHome.addEventListener('click', (e) => {
    refs.teamSection.classList.add('is-visible');
    Pagination.clear();
    Pagination.init(filmService.getFilmsPagination());
    classListHome();
    if (refs.navLinkLibrary.classList.contains('site-navigation__link--active')) {
        setHomeActive();
    }
});
refs.navLinkHome.addEventListener('click', async e => {
    refs.galleryList.innerHTML = '';
    renderFilms(await filmService.getPopularFilms())
});
refs.buttonHomeOnBurger.addEventListener('click', () => {

    refs.teamSection.classList.add('is-visible');
    Pagination.clear();
    Pagination.init(filmService.getFilmsPagination());
    classListHome();
    closeBurger();
});

refs.buttonHomeOnBurger.addEventListener('click', async e => {
    renderFilms(await filmService.getPopularFilms());
});

refs.buttonLibraryOnBurger.addEventListener('click', () => {
    refs.teamSection.classList.add('is-visible');
    Pagination.clear();
    refs.galleryList.innerHTML = '';
    classListLibrary();
    closeBurger();
});
refs.filmsSection.addEventListener('click', (e) => {
    openFilmView(e);
});
refs.buttonWatched.addEventListener('click', onButtonWatched);
refs.buttonQueue.addEventListener('click', onButtonQueue);

function classListHome() {
    refs.pagination.classList.remove('is-visible');
    refs.filmsSection.classList.remove('is-visible');
    refs.pagination.classList.remove('is-visible');
    refs.navLinkHome.classList.add('site-navigation__link--active');
    refs.header.classList.remove('header-library');
    refs.header.classList.remove('header-details');
    refs.header.classList.add('header-home');
    refs.searchForm.classList.remove('is-visible');
    refs.headerButtons.classList.add('is-visible');
    refs.headerButtons.classList.remove('flex');
    refs.filmViewSection.classList.add('is-visible');
    refs.galleryList.classList.remove('is-visible');
    refs.navLinkHome.classList.add('site-navigation__link--active');
    refs.header.classList.remove('header-details');
};

function openFilmView(e) {
    if (e.target.tagName === "IMG") {
        onClickFooterLink();
        refs.filmViewSection.innerHTML = '';
    }

}

function onClickFooterLink() {
    refs.header.classList.add('header-details');
    refs.headerButtons.classList.add('is-visible');
    refs.headerButtons.classList.remove('flex');
    refs.header.classList.remove('header-home');
    refs.header.classList.remove('header-library');
    refs.searchForm.classList.add('is-visible');
    refs.navLinkHome.classList.remove('site-navigation__link--active');
    refs.navLinkLibrary.classList.remove('site-navigation__link--active');
}

function classListLibrary() {
    refs.header.classList.add('header-library')
    Pagination.clear();
    if (refs.header.classList.contains('header-details')) {
        refs.header.classList.add('header-library');
        refs.header.classList.remove('header-details');
        if (refs.buttonWatched.classList.contains('is-active')) {
            renderLibraryHome();
        } else {
            renderLibraryQueue()
        }
    };
    refs.navLinkLibrary.classList.add('site-navigation__link--active');
    refs.teamSection.classList.add('is-visible');
    refs.pagination.classList.remove('is-visible');
    refs.warningMessage.classList.add('is-visible');
    refs.header.classList.remove('header-home');
    refs.header.classList.add('header-library');
    refs.searchForm.classList.add('is-visible');
    refs.headerButtons.classList.remove('is-visible');
    refs.headerButtons.classList.add('flex');
    refs.filmViewSection.classList.add('is-visible');
    refs.filmsSection.classList.remove('is-visible');
    if (refs.navLinkHome.classList.contains('site-navigation__link--active')) {
        refs.navLinkHome.classList.remove('site-navigation__link--active');
        refs.navLinkLibrary.classList.add('site-navigation__link--active');
        if (refs.buttonWatched.classList.contains('is-active')) {
            renderLibraryHome();
        } else {
            renderLibraryQueue()
        }
    }

};

function setHomeActive() {
    refs.navLinkLibrary.classList.remove('site-navigation__link--active');
    refs.navLinkHome.classList.add('site-navigation__link--active');
};

function clickOnBurger() {
    if (refs.header.classList.contains('header-details')) {
        refs.searchForm.classList.remove('is-visible')
    };
    refs.overlayHeader.classList.toggle('is-visible');
    refs.warningMessage.classList.add('is-visible');
    refs.burger.classList.toggle('is-active');
    refs.nav.classList.toggle('flex');
    refs.nav.classList.toggle('is-visible');
    refs.searchForm.classList.toggle('is-visible');
    refs.siteNav.classList.toggle('is-visible');
    refs.headerButtons.classList.add('is-visible');
    refs.headerButtons.classList.remove('flex');
    if (refs.header.classList.contains('header-library')) {
        refs.searchForm.classList.add('is-visible');
        if (!refs.burger.classList.contains('is-active')) {
            refs.headerButtons.classList.remove('is-visible');
            refs.headerButtons.classList.add('flex');
        }
    }
};

function closeBurger() {
    refs.burger.classList.remove('is-active');
    refs.nav.classList.remove('is-visible');
    refs.nav.classList.add('flex');
    refs.overlayHeader.classList.add('is-visible');
};

function openWarningMessage() {
    if (!filmService.query) {
        refs.warningMessage.classList.remove('is-visible');
        refs.warningMessage.textContent = "Search result not successfull. Enter correct movie name and try again";
        Pagination.clear();
        return;
    }
}

function closeWarningMessage() {
    refs.warningMessage.classList.add('is-visible');
    refs.warningMessage.textContent = " ";
}

function onButtonWatched() {
    refs.buttonWatched.classList.add('is-active');
    refs.buttonQueue.classList.remove('is-active');
    if (refs.buttonWatched.classList.contains('is-active')) {
        renderLibraryHome();
    } else {
        renderLibraryQueue()
    }
}

function onButtonQueue() {
    refs.buttonQueue.classList.add('is-active');
    refs.buttonWatched.classList.remove('is-active');
    if (refs.buttonWatched.classList.contains('is-active')) {
        renderLibraryHome();
    } else {
        renderLibraryQueue()
    }
}
export { onClickFooterLink }