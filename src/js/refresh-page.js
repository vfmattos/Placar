window.onkeydown = function (e) {
  if (e.keyCode === 116) {
    e.keyCode = 0;
    e.returnValue = false;
    return false;
  }
}

const restart = () => {
  const confirmed = confirm("Deseja reiniciar o placar?");

  if (confirmed == true) { location.reload(); }
}

document.addEventListener('DOMContentLoaded', () => {
  resetButtons = document.querySelectorAll('[data-game-reset]');

  if(localStorage.getItem('time') !== null) {
    resetTimer();
  }

  resetButtons.forEach((button) => { 
    button.addEventListener('click', restart); 
  });
});