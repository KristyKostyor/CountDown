const btn = document.getElementById("btn");
const btnReset = document.getElementById("btn-reset");
const titleStatus = document.querySelector(".complete");
const titleDate = document.getElementById("title-date");
const inputDate = document.getElementById("date");
const inputWrapper = document.querySelector(".input");
const outputWrapper = document.querySelector(".output");
const outputNumbers = document.querySelector(".numbers");
const countdownTitle = document.querySelector("h1");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownDate = "";
let interval = null;

function startCountDown() {
  countdownDate = inputDate.value;

  if (countdownDate === "") {
    alert("Please enter a date!");
    return;
  } else if (isNaN(Date.parse(countdownDate))) {
    alert("Please enter a valid date");
    return;
  }

  countdownTitle.textContent = titleDate.value;
  localStorage.setItem("titleTimer", titleDate.value);
  localStorage.setItem("dateTimer", inputDate.value);
  showNextView();
}

function showNextView() {
  btn.classList.add("hide");
  btnReset.classList.remove("hide");
  inputWrapper.classList.add("hide");
  outputWrapper.classList.remove("hide");

  dateCalculation();
  interval = setInterval(dateCalculation, second);
}

function dateCalculation() {
  const now = new Date().getTime();
  const distance = new Date(countdownDate).getTime() - now;

  if (distance < 0) {
    outputWrapper.classList.add("hide");
    titleStatus.classList.remove("hide");
    clearInterval(interval);
    titleStatus.textContent = ` ${countdownTitle.textContent} has ended on ${countdownDate}`;
    return;
  }

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  outputNumbers.textContent = `${days} : ${hours} : ${minutes} : ${seconds}`;
}

function resetCountDown() {
  btn.classList.remove("hide");
  btnReset.classList.add("hide");
  inputWrapper.classList.remove("hide");
  outputWrapper.classList.add("hide");
  titleStatus.classList.add("hide");

  countdownTitle.textContent = "Create a new countdown timer";
  titleDate.value = "";
  inputDate.value = "";

  clearInterval(interval);
  localStorage.removeItem("dataTimer");
  localStorage.removeItem("dateTimer");
}

function restoreCountDown() {
  const titleTimer = localStorage.getItem("dataTimer");
  const dateTimer = localStorage.getItem("dateTimer");

  if (titleTimer && dateTimer) {
    countdownTitle.textContent = titleTimer;
    countdownDate = dateTimer;
    showNextView();
  } else {
    btnReset.classList.add("hide");
    inputWrapper.classList.remove("hide");
    outputWrapper.classList.add("hide");
    titleStatus.classList.add("hide");
  }
}

btn.addEventListener("click", startCountDown);
btnReset.addEventListener("click", resetCountDown);

restoreCountDown();
