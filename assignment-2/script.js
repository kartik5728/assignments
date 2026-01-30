// Creating Hooks For all the elements in the html page
const selectPomodoroButton = document.getElementById('pomodoro-button');
const selectShortBreakButton = document.getElementById('short-break-button');
const selelctLongBreakButton = document.getElementById('long-break-button');
const timerControlButton = document.getElementById('timer-control-button');
const selectModeButtons = Array.from(document.querySelectorAll('.select-button'));
const progressBar = document.querySelector(".outer-circle-progress");
const progressValue = document.querySelector('.percentage');


// variables to control the timer
let currentMode = 'pomodoro';
let currentState = 'stopped';
let timerInMin = 25;
let mainColor = '#2563eb';
let subColor = '#cbd8f4'

function setTimerMinutes(value) {
    timerInMin = value;
    progressValue.textContent = `${value >= 10 ? value : '0'+value} : 00`
}

const manageTimer = () => {
    
    let startValue = timerInMin * 60,
    speed = 1000, // to execute the function after every 1 second
    tempMinutes = 0;
    temSeconds = 0;
    minutes = 0,
    seconds = 0,
    progressInDegrees = 0;
    
    const progress = setInterval(() => {

        // executed when the stop button is pressed to reset the timer
        if(currentState === 'stopped') {
            clearInterval(progress);
            progressValue.textContent = `${timerInMin >= 10 ? timerInMin : '0'+timerInMin} : 00`;
            progressBar.style.background = subColor;
            document.title = 'Pomodoro Timer';
            return;
        }

        // Updating time value
        startValue--;
        progressInDegrees = progressInDegrees + (360 / (timerInMin * 60));
        tempMinutes = Math.floor( startValue / 60 );
        tempSeconds = startValue % 60;
        minutes = tempMinutes >= 10 ? tempMinutes : `0${tempMinutes}`;
        seconds = tempSeconds >= 10 ? tempSeconds : `0${tempSeconds}`;
        document.title = `${minutes}:${seconds} - ${currentMode === 'pomodoro' ? 'Focus Time': currentMode === 'short-break' ? 'Short Break' : 'Long Break'}`
        progressValue.textContent = `${minutes} : ${seconds}`;
        progressValue.style.color = `${mainColor}`;

        // filling the circular time progress bar with conic gradient
        progressBar.style.background = `conic-gradient(${mainColor} ${progressInDegrees}deg, ${subColor} 0deg)`;

        if(startValue === 0) {
            clearInterval(progress);
            progressValue.textContent = `${timerInMin >= 10 ? timerInMin : '0'+timerInMin} : 00`;
            progressBar.style.background = subColor;
            document.title = 'Pomodoro Timer';
            return;;
        }
    }, speed)


}

// Function to manage current state (stopped/running)
const setCurrentState = (state, flag) => {
        currentState = state;
    
    if(!flag) {
        manageTimer();
       if(currentState === 'running') {
        selectModeButtons.forEach(button => {
        if(button.id == `${currentMode}-button`)
            button.style.pointerEvents = 'none'
        else {
            button.style.pointerEvents = 'none';
            button.style.opacity = 0.6;
        }

       })
       timerControlButton.textContent = 'STOP';
       } 
       if(currentState === 'stopped') {
        selectModeButtons.forEach(button => {
            if(button.id == `${currentMode}-button`)
                button.style.pointerEvents = 'auto'
            else {
                button.style.pointerEvents = 'auto';
                button.style.opacity = 1;
            }
        })
        timerControlButton.textContent = 'START';
       }
    }

    console.log(currentMode, currentState, timerInMin);
}


// set pomodoro mode function 
const setPomododoroMode = () => {
    currentMode = 'pomodoro';
    setTimerMinutes(25);
    timerControlButton.style.backgroundColor = '#2563eb';
    mainColor = '#2563eb';
    subColor = '#cbd8f4'
    progressValue.style.color = mainColor;
    progressBar.style.backgroundColor = subColor;
    setCurrentState('stopped', true);
}

// set short break mode function
const setShortBreakMode = () => {
    currentMode = 'short-break';
    setTimerMinutes(5);
    timerControlButton.style.backgroundColor = '#059669';
    mainColor = '#059668';
    subColor = '#b3e8d7';
    progressValue.style.color = mainColor;
    progressBar.style.backgroundColor = subColor;
    setCurrentState('stopped', true);
}

// set long break mode function
const setLongBreakMode = () => {
    currentMode = 'long-break';
    setTimerMinutes(10);
    timerControlButton.style.backgroundColor = '#8c49f7';
    mainColor = '#8c49f7';
    subColor = '#e0cdff';
    progressValue.style.color = mainColor;
    progressBar.style.backgroundColor = subColor;
    setCurrentState('stopped', true);
}

// Function to set the timer mode : pomodoro, short break, long break
const setMode = (modeId) => {
    
    switch (modeId) {
        case 'pomodoro-button':
            setPomododoroMode();
            break;

        case 'short-break-button':
            setShortBreakMode();
            break;

        case 'long-break-button':
            setLongBreakMode();
            break;

        default:
            break;

    }
}


// Adding event listeners to select mode buttons
selectModeButtons.forEach(selectModeButton => {
    let id = selectModeButton.id;
    selectModeButton.addEventListener('click', () => {
       selectModeButtons.forEach(btn => {
        if(id === btn.id) 
        {
            btn.classList.add('active-button');
            setMode(id);
        }
        else 
            btn.classList.remove('active-button')
       })
    })
})

// Handling events when the timerControlButton (START/STOP) button is clicked
timerControlButton.addEventListener('click', () => setCurrentState(`${currentState === 'running' ? 'stopped' : 'running'}`));

// Default settings when the window is loaded
window.onload = () => {
    setMode('pomodoro-button');
}