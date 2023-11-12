const refs = {
  startBth: document.querySelector('button[data-start]'),
  stopBth: document.querySelector('button[data-stop]'),
};

const body = document.querySelector('body');

refs.startBth.addEventListener('click', startClick);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startClick() {
  refs.stopBth.disabled = false;
  refs.startBth.disabled = true;
  const firstColor = getRandomHexColor();
  console.log(firstColor);
  body.style.background = firstColor;
  const timerId = setInterval(() => {
    const restColor = getRandomHexColor();
    console.log(restColor);
    body.style.background = restColor;
  }, 1000);
}
refs.stopBth.addEventListener('click', stopClick);

function stopClick() {
  refs.startBth.disabled = false;
  refs.stopBth.disabled = true;
  clearTimeout(timerId);
}
