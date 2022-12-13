const btn = document.getElementById('btn');
const btnReset = document.getElementById('btn-reset');
const titleStatus = document.querySelector('.complete');
const titleDate = document.getElementById('title-date');
const inputDate = document.getElementById ('date');
const inputWrapper = document.querySelector('.input');
const outputWrapper = document.querySelector('.output');
const outputNumbers = document.querySelector ('.numbers');
const countdownTitile = document.querySelector('h1');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownDate = '';
let interval;


function startCountDown() {
  countdownDate = inputDate.value;

  if(countdownDate ===  '') {
    alert('Пожалуйста, введите дату!');
    return;
  } else if (isNaN(Date.parse(countdownDate))){
    alert('Пожалуйста введите корректирую дату');
    return;
  }
  countdownTitile.textContent = titleDate.value;
  localStorage.setItem('titleTimer', titleDate.value);
  localStorage.setItem ('dateTimer', inputDate.value);
  showNextView();
}

function showNextView() {
  btn.classList.add('hide');
  btnReset.classList.remove('hide');
  inputWrapper.classList.add('hide');
  outputWrapper.classList.remove('hide');

dateCalculation();
interval = setInterval(dateCalculation, second);

}

function dateCalculation() {
const now = new Date().getTime();
const distance = new Date(countdownDate).getTime() - now;

    if (distance < 0) {
      outputWrapper.classList.add('hide');
      titleStatus.classList.remove('remove');
      clearInterval(interval);
      titleStatus.textContent = ` ${countdownTitile.textContent} завершился ${countdownDate}`;
      return;
    }
  

const days = Math.floor(distance / day);
const hours = Math.floor((distance % day) / hour);
const minutes = Math.floor((distance % hour) / minute);
const seconds = Math.floor((distance % minute) / second);

outputNumbers.textContent = `${days} : ${hours} : ${minutes} : ${seconds}`;

}
function resetCountDown() {
  btn.classList.add("hide");
  btnReset.classList.remove("hide");
  inputWrapper.classList.add("hide");
  outputWrapper.classList.remove("hide");
  titleStatus.classList.add('hide');

  countdownTitile.textContent = 'Создать новый таймер обратного отчета';
  titleDate.value = '';
  inputDate.value = '';

  clearInterval(interval);
  localStorage.removeItem('titleTimer');
  localStorage.removeItem('dataTimer');
}

function restoreCountDown() {
 const titleTimer = localStorage.getItem ('titleTimer');
 const dataTimer = localStorage.getItem('dataTimer');

 if(!(titleTimer && dataTimer)) {
  return;
 }
 countdownTitile.textContent = titleTimer;
 countdownDate = dataTimer;
 showNextView();
}
btn.addEventListener('click', startCountDown);
btnReset.addEventListener('click', resetCountDown);

restoreCountDown();
