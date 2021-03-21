const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1"),
      timer = clockContainer.querySelector("h3.dday-timer");

function getTime() {
  const now = new Date();
  const min = now.getMinutes();
  const hours =now.getHours();
  const sec = now.getSeconds();
  clockTitle.innerText = `${hours <10? `0${hours}`:hours}:${min <10? `0${min}`:min}:${sec <10? `0${sec}`:sec}`;

}

function getDdayChristmas() {
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const now = new Date();
  const remainTimeMilisec = xmasDay - now;

  const second = Math.floor(remainTimeMilisec / 1000) % 60;
  const min = Math.floor(remainTimeMilisec / (1000 * 60)) % 60;
  const hour = Math.floor(remainTimeMilisec / (1000 * 60 * 60)) % 24;
  const day = Math.floor(remainTimeMilisec / (1000 * 60 * 60 * 24));

  timer.innerHTML = `${day}d 
    ${hour < 10 ? `0${hour}` : hour}h 
    ${min < 10 ? `0${min}` : min}m 
    ${second < 10 ? `0${second}` : second}s`;
}

function init() {
  setInterval(getTime, 1000);
}
init();