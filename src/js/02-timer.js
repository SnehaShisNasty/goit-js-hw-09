import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const calendar = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];

    options.onCloseCallback(selectedDate);
  },
};

startBtn.disabled = true;

options.onClosePromise = new Promise(resolve => {
  options.onClosePromiseResolver = resolve;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function openCalendar() {
  flatpickr(calendar, options);

  options.onCloseCallback = selectedDate => {
    const getSelectedDate = selectedDate.getTime();
    const getDefaultDate = options.defaultDate.getTime();
    if (getSelectedDate < getDefaultDate) {
      Notiflix.Report.failure(
        'Fail',
        'Please choose a date in the future',
        'Try again'
      );
    } else if (getSelectedDate >= getDefaultDate) {
      startBtn.addEventListener('click', startClick);
      startBtn.disabled = false;
      function startClick() {
        startBtn.disabled = true;

        function addLeadingZero(date) {
          return String(date).padStart(2, '0');
        }

        function updateTimer() {
          let date = new Date();
          date = selectedDate - date;
          const objDate = convertMs(date);

          for (const key in objDate) {
            if (objDate.hasOwnProperty(key)) {
              objDate[key] = addLeadingZero(objDate[key]);
            }
          }

          console.log(objDate);

          dataDays.textContent = objDate.days;
          dataHours.textContent = objDate.hours;
          dataMinutes.textContent = objDate.minutes;
          dataSeconds.textContent = objDate.seconds;
          console.log(dataSeconds.textContent);
          if (
            dataDays.textContent === '00' &&
            dataHours.textContent === '00' &&
            dataMinutes.textContent === '00' &&
            dataSeconds.textContent === '00'
          ) {
            clearInterval(timerId);
          }
        }
        timerId = setInterval(updateTimer, 1000);
      }
    }
  };
}
openCalendar();
