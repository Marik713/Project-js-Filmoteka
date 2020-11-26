const axios = require('axios');
import genresIds from './genres'
const token = "bfce076e7c9a3c60d70abb15359c6391";
import {spinerStart, spinerStop} from '../helpers/spiner'

export default {

    searchQuery: '',
    page: 1,

async getFilms() {
  try {
      spinerStart()
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${this.query}&page=${this.page}&include_adult=false&language=en-US&`,
    );
    spinerStop();
      const newData =  response.data.results.map(item => {
              let newGenres = [];
              try{item.genre_ids.map(id => {
          const found = genresIds.find(item => item.id === id);
          newGenres.push(found.name);
              });
              }
              catch { console.log("Сломалось");}
        
        if (newGenres.length >= 3) {
          const normalizedGenres = newGenres.slice(0, 2);
          normalizedGenres.push('Other');
          item.genre_ids = normalizedGenres.join(', ');
          item.release_date = item.release_date.slice(0, 4);
        } else {
          item.genre_ids = newGenres.join(', ');
          if (item.release_date)
            item.release_date = item.release_date.slice(0, 4);
        }
        return item;
      });
      return newData;
    } catch (error) {
      console.error(error);
    }
  },
    async getPopularFilms() {
      try {
          spinerStart()
        const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${token}`);
        spinerStop()
        const newData = response.data.results.map(item => {
          let newGenres = [];
              try{item.genre_ids.map(id => {
          const found = genresIds.find(item => item.id === id);
                newGenres.push(found.name);
              });
              }
              catch { console.log("На item немає жанрів");}
        
        if (newGenres.length >= 3 && item.release_date) {
          const normalizedGenres = newGenres.slice(0, 2);
          normalizedGenres.push('Other');
          item.genre_ids = normalizedGenres.join(', ');
          item.release_date = item.release_date.slice(0, 4);
        } else {
          item.genre_ids = newGenres.join(', ');
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
        } catch (error) {
            console.error(error);
        }
    },
    async getFilmId(id) {
      try {
          spinerStart()
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${token}&include_adult=false&language=en-US`);
        spinerStop();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
  getFilmsPagination() {
    spinerStart()
    spinerStop();
    return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${token}`);
    },
  getFilmsPaginationByPage(page) {
    spinerStart()
    spinerStop();
        return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${token}&page=${page}`);
  },
  getFilmPaginationOnSearch(page) {
    spinerStart()
    spinerStop();
      return axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${this.query}&page=${this.page}&include_adult=false&language=en-US&`,
      );
    },
    resetPage() {
        this.page = 1
    },
    incrementPage() {
        this.page += 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    }
};