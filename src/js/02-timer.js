import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

// refs

const timerHtml = document.querySelector('.timer');
const datePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const text = document.querySelector('.label');


// styles

timerHtml.style.fontSize = '20px';
timerHtml.style.display = 'flex';
timerHtml.style.justifycontent = 'space-between';
timerHtml.style.margintop = '70px';



//   refs.startBtn.setAttribute('disabled', 'disabled');

// //Initialize id for interval
// let intervalId;

btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      //Reject any date before or equal to Date.now()
      //Using Notify for alert
      //Disables start button if user changed date from future to before
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        btnStart.disabled = true;
      }else{ btnStart.disabled = false;}
    },
  };
  


//Initialize flatpickr
flatpickr(datePicker, options);




  //Function to convert milliseconds to object of days,hours,minutes,seconds
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  //Function to make string of minimum 2 symbols and start with "0"
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  // function addAttributeDisabled(elem, value) {
  //   elem.disabled = value;
  // }
  
  // function changeTextContent(elem, obj, units) {
  //   elem.textContent = addLeadingZero(obj[units]);
  // }


  //Event to start timer, change markup

btnStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(datePicker.value) - new Date();
    btnStart.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerHtml.style.color = 'tomato';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});