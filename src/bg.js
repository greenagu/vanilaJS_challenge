const body = document.querySelector("body");

const IMG_NUMBER = 5;
const IMG_TYPE = ["clear", "snow", "thunderstorm", "rainy"];

function PaintImate(type) {
  console.log(type.toLowerCase());
  const weatherCondition = type.toLowerCase();
  let imgName = "random";
  if (IMG_TYPE.includes(weatherCondition)) {
    imgName = weatherCondition;
  }
  imgName +=getRandom();
  const image = new Image();
  image.src = `images/${imgName}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function getRandom(){
  const number = Math.random()*IMG_NUMBER+1;
  return Math.floor(number)
}

function init() {
  // const randomNumber = getRandom();
}
init();