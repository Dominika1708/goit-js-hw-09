import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateSelector = document.querySelector('input');
const button = document.querySelector('button');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      button.disabled = true;
      window.alert('Please choose a date in the future');
    }
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      button.disabled = false;
    }
  },
};

flatpickr(dateSelector, options);

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

button.addEventListener('click', () => {
  const setCountdown = () => {
    const selectedDate = new Date(dateSelector.value);
    const actualDate = new Date();
    const dateDifference = selectedDate.getTime() - actualDate.getTime();
    const countdown = convertMs(dateDifference);

    if (dateDifference < 1000) {
      clearInterval(timerId);
    }

    const changeSpan = () => {
      daysValue.textContent = addLeadingZero(countdown.days.toString());
      hoursValue.textContent = addLeadingZero(countdown.hours.toString());
      minutesValue.textContent = addLeadingZero(countdown.minutes.toString());
      secondsValue.textContent = addLeadingZero(countdown.seconds.toString());
    };
    changeSpan();
  };
  const timerId = setInterval(setCountdown, 1000);
});

function addLeadingZero(value) {
  if (value.length === 1) {
    return value.padStart(2, '0');
  }
  return value;
}
