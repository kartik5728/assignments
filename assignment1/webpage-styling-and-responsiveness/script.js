// Use local storage for persistance on reload
const currentMode = 'current-mode';


const darkButton = document.getElementById("dark-mode-button");
const lightButton = document.getElementById("light-mode-button");
const cards = document.getElementsByClassName('card');
const followButtons = document.getElementsByClassName('card-follow-button'); 
const headingContainer = document.getElementById('heading-container');

const darkMode = () => {
    document.body.classList.add('dark-mode-body');

    darkButton.classList.add('dark-mode-switch');
    darkButton.classList.add('mode-active');
    lightButton.classList.add('dark-mode-switch');
    lightButton.classList.remove('mode-active');
    headingContainer.classList.add('dark-mode-heading-container');


     for (let card of cards) {
    card.classList.add('dark-mode-cards');
  }

  for (let followButton of followButtons) {
    followButton.classList.add('dark-mode-follow-button');
  }
}

const lightMode = () => {
     document.body.classList.remove('dark-mode-body');

      darkButton.classList.remove('dark-mode-switch');
      darkButton.classList.remove('mode-active');
    lightButton.classList.remove('dark-mode-switch');
    lightButton.classList.add('mode-active');
    headingContainer.classList.remove('dark-mode-heading-container');

     for (let card of cards) {
    card.classList.remove('dark-mode-cards');
  }

  for (let followButton of followButtons) {
    followButton.classList.remove('dark-mode-follow-button');
  }
}

const applyPreference = () => {
  const mode = localStorage.getItem(currentMode) || 'light';

  if (mode === 'dark') 
    darkMode();
  if (mode === 'light') 
    lightMode();
};

darkButton.addEventListener('click', () => {
  localStorage.setItem(currentMode, 'dark');
  applyPreference();
});

lightButton.addEventListener('click', () => {
  localStorage.setItem(currentMode, 'light');
  applyPreference();
});

window.onload = () => {
    applyPreference()
};