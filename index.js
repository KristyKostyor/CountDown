const inputContainer = document.querySelector(".container");
const countdownForm = document.querySelector(".input");
const dateEl = document.querySelector("#date");
const countdownEl = document.querySelector("#title-date");
const countdownElTitle = document.querySelector(".time-labels");
const countdownBtn = document.querySelector("#btn");
const timeElements = document.querySelectorAll("p");

const completeBtn = document.querySelector("#btn-reset");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance <= 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} was finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      countdownEl.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.input.value;
  countdownDate = e.input.value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("output", JSON.stringify(savedCountdown));

  if (countdownDate === "" || countdownTitle === "") {
    alert("incomplete form");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset() {
  inputContainer.hidden = false;

  clearInterval(countdownActive);

  countdownDate = "";
  countdownTitle = "";
  localStorage.removeItem("output");
}

function restorePreviousCountdown() {
  if (localStorage.getItem("output")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("output"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownBtn.addEventListener("click", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();
