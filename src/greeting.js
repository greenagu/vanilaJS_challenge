const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_NAME = "currentUser",
      SHOWING_CN = "showing";

function saveName(name) {
  localStorage.setItem(USER_NAME, name);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  console.log(event.target);
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요 ${text}님 😁`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();