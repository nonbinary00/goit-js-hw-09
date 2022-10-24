const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
  };

  let interval = null


refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function changeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
  }

  function startChangeColor() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    interval = setInterval(changeColor, 1000);
    
  }

  function stopChangeColor() {
    clearInterval(interval);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    
  }