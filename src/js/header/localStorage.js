import filmService from './apiService'
import filmLibrary from './templates/libraryHome.hbs'


function addToWatch(id) {
    const addToWatchBtn = document.querySelector('.film-view-buttons--watched');

    addToWatchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
      const watchedList = JSON.parse(localStorage.getItem("Watch")) || [];
      addToWatchBtn.classList.toggle('film-view-buttons--active');
      const object = await filmService.getFilmId(id);
        const name = 'Watch';
      checkList(watchedList, object, name);
      if (addToWatchBtn.classList.contains('film-view-buttons--active')) {
        e.target.textContent = "ADDED TO WATCH";
      }
      else {
        e.target.textContent = "ADD TO WATCH";
      }
    })
}

function addToQueue(id) {
    const addToQueueBtn = document.querySelector('.film-view-buttons--queue');

    addToQueueBtn.addEventListener('click',async (e) => {
        e.preventDefault();
        const watchedQueue = JSON.parse(localStorage.getItem("Queue")) || [];
        addToQueueBtn.classList.toggle('film-view-buttons--active');
        const object = await filmService.getFilmId(id);
        const name = 'Queue';
      checkList(watchedQueue, object, name);
      if (addToQueueBtn.classList.contains('film-view-buttons--active')) {
        e.target.textContent = "ADDED TO QUEUE";
      }
      else {
        e.target.textContent = "ADD TO QUEUE";
      }
    })
}

function checkList(list, movie, name) {
    const { id } = movie;
    if (list.find((item) => item.id === id)) {
      list = list.filter((item) => item.id !== id);
      localStorage.setItem(name, JSON.stringify(list));
    } else {
      list.push(movie);
      localStorage.setItem(name, JSON.stringify(list));
    }
}

function renderLibraryHome() {
const data = JSON.parse(localStorage.getItem("Watch"));
refs.galleryList.innerHTML = '';
renderFilms(normalize(data));
}

function renderLibraryQueue() {
  const data = JSON.parse(localStorage.getItem("Queue"));
  refs.galleryList.innerHTML = '';
  renderFilms(normalize(data));
}

function renderFilms(data) {
  const markup = filmLibrary(data);
  return refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function normalize(item) {
   const newData = item.map(item => {
          if (item.genres >= 3 && item.release_date) {
          item.genres = item.genres.slice(0, 2);
          item.release_date = item.release_date.slice(0, 4);
        } else {
          if (item.release_date){
            item.release_date = item.release_date.slice(0, 4);
          }
          if (item.first_air_date) {
            item.release_date = item.first_air_date.slice(0, 4);
          }
          }
          
        return item;
      });
      return newData;
}

function setActive(e, id) {
  const addToWatchBtn = document.querySelector('.film-view-buttons--watched');
  const addToQueueBtn = document.querySelector('.film-view-buttons--queue');
  console.dir(addToWatchBtn);

  const dataWatch = JSON.parse(localStorage.getItem("Watch"));
  const dataQueue = JSON.parse(localStorage.getItem("Queue"));
  const searchItemOnWatch = dataWatch.map((elem) => {
    if (elem.id === id) {
      addToWatchBtn.classList.add('film-view-buttons--active')
      addToWatchBtn.textContent = "ADDED TO WATCH";
    }
    else {
      return
    }
  })
  const searchItemOnQueue = dataQueue.map((elem) => {
    if (elem.id === id) {
      addToQueueBtn.classList.add('film-view-buttons--active')
      addToQueueBtn.textContent = "ADDED TO QUEUE";
    }
    else {
      return
    }
  })

  
}


export {addToWatch, addToQueue, renderLibraryHome, renderLibraryQueue, setActive, checkList, renderFilms, normalize}