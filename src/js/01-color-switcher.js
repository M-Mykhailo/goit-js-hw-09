const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

const DELAY_TIME = 1000;
let interval = null;
let disabled = false;

refs.btnStart.addEventListener('click', startChangeColor);
refs.btnStop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  interval = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }, DELAY_TIME);
  refs.btnStart.disabled = true;
  refs.btnStart.disabled = false;
}

function stopChangeColor() {
  clearInterval(interval);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}






// const btnStart = document.querySelector('[data-start]');
// const btnStop = document.querySelector('[data-stop]');
// const body = document.querySelector('body');
// let interval = null;

// btnStart.addEventListener('click', () => {
//   interval = setInterval(() => {
//     const randomColor = getRandomHexColor();
//     body.style.backgroundColor = randomColor;
//   }, 1000);
//   btnStart.setAttribute('disabled', 'disabled');
//   btnStop.removeAttribute('disabled');
// });

// btnStop.addEventListener('click', () => {
//   clearInterval(interval);
//   btnStart.removeAttribute('disabled');
//   btnStop.setAttribute('disabled', 'disabled');
// });

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }
