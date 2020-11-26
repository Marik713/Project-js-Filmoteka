import Pagination from '../header/pagination';
import person from "../header/templates/person.hbs";
import teamList from "../header/templates/team.json";
import { onClickFooterLink } from '../header/refChangeHeader';
refs.footerLink.addEventListener('click', (e) => {
    e.preventDefault();
    Pagination.clear();
    onClickFooterLink();
    refs.galleryList.innerHTML = '';
    const markup = person(teamList);
    const teamListRef = document.getElementById('team-list');
    teamListRef.innerHTML = '';
    teamListRef.insertAdjacentHTML('beforeend', markup);
    showTeamSection();
});
function showTeamSection() {
    refs.filmsSection.classList.add('is-visible');
    refs.filmViewSection.classList.add('is-visible');
    refs.teamSection.classList.remove('is-visible');
    window.scrollTo({ top: 0 });
}