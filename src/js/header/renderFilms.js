import picture from './templates/filmInfo.hbs';
import '../helpers/reference'

function renderFilms(data) {
    const markup = picture(data);
    return refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
export default renderFilms;