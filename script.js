const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownReset = document.getElementById('countdown-reset');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
countdownTitleConverted = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

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
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour) + 3;
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // establece los valores del contador
    countdownElTitle.textContent = `${countdownTitleConverted}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    // esconde el input
    inputContainer.hidden = true;
    // muestra el contador
    countdownEl.hidden = false;
  }, second);
};

// actualiza el contador con los valores del input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  countdownTitleConverted = fistLetterMayus(countdownTitle);

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
  inputContainer.hidden = false;
  // detiene el contador
  clearInterval(countdownActive);
  // reinicia los valores
  countdownTitle = '';
  countdownDate = '';
  countdownTitleConverted = '';
};

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownReset.addEventListener('click', reset);
