import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// refs

const {
    flatpickrInput,
    startBtn,
    daysValue,
    hoursValue,
    minutesValue,
    secondsValue,
    fields,
    timer,
 } = {
    flatpickrInput: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
    fields: document.querySelectorAll('.field'),
    timer: document.querySelector(".timer"),
  };

// styles

timer.style.display = "flex";
timer.style.gap = "30px";
timer.style.marginTop = "30px";

//   refs.startBtn.setAttribute('disabled', 'disabled');

//Initialize id for interval
let intervalId;

refs.startBtn.setAttribute('disabled', '');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      //Reject any date before or equal to Date.now()
      //Using Notify for alert
      //Disables start button if user changed date from future to before
      if (Date.now() - selectedDates[0].getTime() >= 0) {
        // addAttributeDisabled(startBtn, true);
        refs.startBtn.setAttribute('disabled', 'true');
  
        Notify.failure('Please choose a date in the future');
        return;
      }
  
      // addAttributeDisabled(startBtn, false);
      refs.startBtn.setAttribute('disabled', 'false');
    },
  };
  


//Initialize flatpickr
const fp = flatpickr('#datetime-picker', options);

//Event to start timer, change markup

startBtn.addEventListener('click', () => {
    addAttributeDisabled(startBtn, true);
  
    intervalId = setInterval(() => {
      const timeDelta = fp.selectedDates[0].getTime() - Date.now();
      //To stop timer when it hits 0
      if (timeDelta <= 0) {
        clearInterval(intervalId);
        return;
      }
      const convertedDelta = convertMs(timeDelta);

      changeTextContent(daysValue, convertedDelta, 'days');
      changeTextContent(hoursValue, convertedDelta, 'hours');
      changeTextContent(minutesValue, convertedDelta, 'minutes');
      changeTextContent(secondsValue, convertedDelta, 'seconds');
  
      console.log(convertedDelta);
    }, 1000);
  });


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
    return String(value).padStart(2, '0');
  }
  
  function addAttributeDisabled(elem, value) {
    elem.disabled = value;
  }
  
  function changeTextContent(elem, obj, units) {
    elem.textContent = addLeadingZero(obj[units]);
  }