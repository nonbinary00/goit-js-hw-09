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

  //Options for flatpickr
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
        addAttributeDisabled(startBtn, true);
  
        Notify.failure('Please choose a date in the future');
        return;
      }
  
      addAttributeDisabled(startBtn, false);
    },
  };

