import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
  };

  refs.startBtn.setAttribute('disabled', 'disabled');

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    static: true,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] >= Date.now()) {
        refs.startBtn.removeAttribute('disabled');
      } else {
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.setAttribute('disabled', 'disabled');
      }
    },
  };

  flatpickr('#datetime-picker', options);


  