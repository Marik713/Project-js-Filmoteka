import profileTpl from "../header/templates/profile.hbs"
import teamList from "../header/templates/team.json"
import {changeProfile, swipeProfileStart} from '../profile/profile.js'
refs.teamList.addEventListener('click', (event) => {
    const personID = Number(event.target.dataset.id);
    if (personID) {
        event.preventDefault();
        const profile = teamList.find((item) => item.id === personID);
        const markup = profileTpl(profile);
        refs.profileModal.insertAdjacentHTML('beforeend', markup);        
        showProfileSection();
    }
});
function showProfileSection() {
    refs.profileModal.classList.remove('is-visible');        
    window.scrollTo({top: 0});
    window.addEventListener('keydown', changeProfile);
    swipeProfileStart();
}