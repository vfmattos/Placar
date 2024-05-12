let timer;
let timerDisplay = document.getElementById('timer-display');
let startPauseButton = document.getElementById('startPauseButton');
let resetButton = document.getElementById('resetButton');
let setTimeButton = document.getElementById('setTimeButton');
let buttonsDiv = document.getElementById('timer-controls');
let menuIcon = document.getElementById('menu-icon');

let originalTime = 0;
let remainingTime = 0;
let isTimeSet = false; 


setTimeButton.addEventListener('click', setTime);
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);


function toggleMenu() {
  buttonsDiv.style.display = buttonsDiv.style.display === 'none' ? 'block' : 'none';
}

function startPauseTimer() {
  if (!timer && isTimeSet) { 
    startTimer();
    startPauseButton.textContent = 'Pause';
  } else if (isTimeSet) { 
    pauseTimer();
    startPauseButton.textContent = 'Start';
  } else {
    alert("DEFINA O TEMPO ANTES DE COMEÇAR!");
  }
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    remainingTime--;
    if (remainingTime >= 0) {
      let seconds = remainingTime % 60;
      let minutes = Math.floor(remainingTime / 60);
      displayTime(minutes, seconds);
    } else {
      clearInterval(timer);
      timer = null;
      timerDisplay.style.color = '';
    }if (remainingTime === 0) {
      blink(timerDisplay); 
    }
  }, 1000);
}

function blink(element) {
  let interval = setInterval(() => {
    element.style.visibility = (element.style.visibility === 'hidden' ? '' : 'hidden');
  }, 500);
  
  setTimeout(() => {
    timerDisplay.style.color = 'red';
    clearInterval(interval);
    element.style.visibility = '';
  }, 3000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  if(localStorage.getItem('time') != null) {
    isTimeSet = true;
  }
  let confirmarReset = confirm('RESETAR TEMPO?');
  if (confirmarReset) {
    clearInterval(timer);
    timer = null;
    remainingTime = localStorage.getItem('time');
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    displayTime(minutes, seconds);
    startPauseButton.textContent = 'Start';
    startPauseButton.disabled = true; 
    timerDisplay.style.color = '';
  }
}

function setTime() {
  let userInputMinutes = prompt("MINUTOS:");
  let userInputSeconds = prompt("SEGUNDOS:");

  let minutes = parseInt(userInputMinutes);
  let seconds = parseInt(userInputSeconds);

  if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0) {
    originalTime = remainingTime = minutes * 60 + seconds;
    localStorage.setItem('time', originalTime);
    displayTime(minutes, seconds);
    isTimeSet = true;
    startPauseButton.style.display = 'inline';
    startPauseButton.disabled = false;
    timerDisplay.style.color = '';
  } else {
    alert("DIGITE APENAS NÚMEROS VÁLIDOS PARA MINUTOS E SEGUNDOS!");
  }
}

function displayTime(minutes, seconds) {
  let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  timerDisplay.innerHTML = `${displayMinutes}:${displaySeconds}`;
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    startPauseTimer();
  }
});
