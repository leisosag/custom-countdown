const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownReset = document.getElementById('countdown-reset');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
countdownTitleConverted = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// establece la fecha minima con el dia actual
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// convierte la primera letra en mayuscula
const fistLetterMayus = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// actualiza los valores del contador
const updateDOM = () => {
  countdownActive = setInterval(() => {
    // esconde el input
    inputContainer.hidden = true;
    // calcula el contador
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour) + 3;
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // si el contador termino, muestra el completado
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `El contador para ${countdownTitle} terminó el ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // muestra el contador
      countdownElTitle.textContent = `${countdownTitleConverted}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
};

// actualiza el contador con los valores del input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  countdownTitleConverted = fistLetterMayus(countdownTitle);
  savedCountdown = {
    title: countdownTitleConverted,
    date: countdownDate,
  };
  // guarda los datos del contador en localStorage
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // chequea que la fecha sea valida
  if (countdownDate === '') {
    alert('Por favor, seleccione una fecha para el contador');
  } else {
    // fecha en numeros, actualiza el DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// reinicia el contador
const reset = () => {
  // esconde el contador y muestra el input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // detiene el contador
  clearInterval(countdownActive);
  // reinicia los valores
  countdownTitle = '';
  countdownDate = '';
  countdownTitleConverted = '';
  localStorage.removeItem('countdown');
};

// trae si existe un contador en localStorage
const restorePreviousCountdown = () => {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownTitleConverted = fistLetterMayus(countdownTitle);
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownReset.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// al iniciar
restorePreviousCountdown();
