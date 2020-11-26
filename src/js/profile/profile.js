import teamList from "../header/templates/team.json"
import profileTpl from "../header/templates/profile.hbs"
let touchstartX = 0,
    touchendX   = 0;
export function swipeProfileStart() {
    refs.profileContent = document.querySelector('.profile-content');    
    if (refs.profileContent !== null) {
        refs.profileContent.addEventListener('touchstart', touchStart);
        refs.profileContent.addEventListener('touchend', touchEnd);
    }
}
function swipeProfileBreak() {
    refs.profileContent.removeEventListener('touchstart', touchStart);
    refs.profileContent.removeEventListener('touchend', touchEnd);
}
function touchStart(event) {
    touchstartX = event.changedTouches[0].screenX;
}
function touchEnd(event) {
    touchendX = event.changedTouches[0].screenX;
    let personID = Number(refs.profileContent.dataset.id);
    if (touchendX < touchstartX) {
        if (personID === teamList.length) {
            personID = 1;
        } else {
            personID++;
        }
        showOther(personID);
    }
    if (touchendX > touchstartX) {
        if (personID === 1) {
            personID = teamList.length;
        } else {
            personID--;                
        }
        showOther(personID);
    }
}
export function changeProfile(event) {
    refs.profileContent = document.querySelector('.profile-content');
    let personID = Number(refs.profileContent.dataset.id);
    switch(event.code) {
        case ('ArrowLeft'): {
            if (personID === 1) {
                personID = teamList.length;
            } else {
                personID--;                
            }
            showOther(personID);
            break;
        }
        case ('ArrowRight'): {
            if (personID === teamList.length) {
                personID = 1;
            } else {
                personID++;
            }
            showOther(personID);
            break;
        }
        case ('Escape'): {
            hideProfile();
            break;
        }
    }
}
function showOther(id) {
    const newPerson = teamList.find((item) => item.id === id),
          markup = profileTpl(newPerson);
    refs.profileContent.remove();
    refs.profileModal.insertAdjacentHTML('beforeend', markup);
    swipeProfileStart();
}
refs.profileModal.addEventListener('click', (event) => {
    if (event.target.dataset.close) {
        event.preventDefault();
        hideProfile();
    }
});
refs.profileCloseBtn.addEventListener('click', (event) => {
    event.preventDefault();
    hideProfile();
});
function hideProfile() {
    refs.profileModal.classList.add('is-visible');
    swipeProfileBreak();
    refs.profileContent.remove();
    window.removeEventListener('keydown', changeProfile);
}