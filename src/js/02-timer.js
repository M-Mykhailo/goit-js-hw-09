import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  btnSrartTimer: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
};

refs.btnSrartTimer.disabled = true;
refs.dateTimePicker.disabled = false;
const TIME_OUT = 3000;
const DELAY_TIME = 1000;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      refs.btnSrartTimer.disabled = false;
      Notiflix.Notify.success('Please click the "Start" button', {
        timeout: TIME_OUT,
      });
    } else {
      refs.btnSrartTimer.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future', {
        timeout: TIME_OUT,
      });
    }
  },
};

refs.btnSrartTimer.addEventListener('click', startTimer);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  const selectedDate = flatPickr.selectedDates[0];

  timerId = setInterval(() => {
    const nowDate = new Date();
    const dateDifference = selectedDate - nowDate;
    refs.btnSrartTimer.disabled = true;
    refs.dateTimePicker.disabled = true;

    if (dateDifference <= 0) {
      clearInterval(timerId);
      refs.dateTimePicker.disabled = false;
      Notiflix.Report.success('Congratulations', 'The time has come', 'Ok');
      return;
    } else {
      updateTimer(convertMs(dateDifference));
    }
  }, DELAY_TIME);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

const flatPickr = flatpickr(refs.dateTimePicker, options);

document.body.style.backgroundColor = '#99add0';

