import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// refs

const {
    flatpickrInput,
    startBtn,
    daysValue,
    hoursValue,
    minutesValue,
    secondsValue,
    fields,
 } = {
    flatpickrInput: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
    fields: document.querySelectorAll('.field'),
  };

//   refs.startBtn.setAttribute('disabled', 'disabled');

//Initialize id for interval
let intervalId;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		if (Date.now() > selectedDates[0].getTime()) {
			Notify.failure("Please choose a date in the future");
			addAttributeDisabled(startBtn, true);
			return;
		}
		addAttributeDisabled(startBtn, false);
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
