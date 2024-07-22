import Alpine from 'alpinejs';

Alpine.store('isDeviceDesktop', document.documentElement.classList.contains('is-device-desktop'));
Alpine.store('minLg', window.innerWidth >= 1025);
window.addEventListener('resize', () => Alpine.store('minLg', window.innerWidth >= 1025));

let { scrollY } = window;

Alpine.store('scrollDir', -1);
Alpine.store('scrollY', scrollY);
window.addEventListener('scroll', () => {
  Alpine.store('scrollDir', window.scrollY - scrollY > 0 ? 1 : -1);
  Alpine.store('scrollY', scrollY = window.scrollY);
}, { passive: true });

Alpine.store('hash', window.location.hash);
window.addEventListener('hashchange', () => Alpine.store('hash', window.location.hash));

(function updateTime() {
  Alpine.store('time', Math.floor(Date.now() / 100) * 100);

  requestAnimationFrame(updateTime);
}());

// Datetime
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

Alpine.store('formatTime', (time, full = false, timer = false) => {
  /* eslint-disable */
  let years = full && Math.floor(time / YEAR);
  const q = Math.floor(years / 4);
  const yearsRest = (time % YEAR) - q * DAY;

  let months = full && Math.floor(yearsRest / MONTH);
  const monthsRest = yearsRest % MONTH;

  let weeks = full && Math.floor(monthsRest / WEEK);
  const weeksRest = monthsRest % WEEK;

  let days = Math.floor((full ? weeksRest : time) / DAY);
  const daysRest = weeksRest % DAY;

  let hours = Math.floor(daysRest / HOUR);
  const hoursRest = daysRest % HOUR;

  let minutes = Math.floor(hoursRest / MINUTE);
  const minutesRest = hoursRest % MINUTE;

  let seconds = Math.floor(minutesRest / SECOND);
  const secondsRest = minutesRest % SECOND;

  const milliSeconds = secondsRest;

  if (timer) {
    // years += months > 0 ? 1 : 0;
    // months += weeks > 0 ? 1 : 0;
    // weeks += days > 0 ? 1 : 0;
    // days += hours > 0 ? 1 : 0;
    hours = minutes === 59 && seconds === 59 && milliSeconds > 0 ? (hours + 1) % 24 : hours;
    minutes = seconds === 59 && milliSeconds > 0 ? (minutes + 1) % 60 : minutes;
    seconds = milliSeconds > 0 ? (seconds + 1) % 60 : seconds;
  }

  const str = [hours, minutes, seconds].map((number) => number.toString().padStart(2, '0')).join(':');

  return `
    ${years ? `${years} г. ` : ''}
    ${months ? `${months} м. ` : ''}
    ${weeks ? `${weeks} н. ` : ''}
    ${days ? `${days} д. ` : ''}
    ${str}
  `;
});

/* Alpine.store('formatTime2', (time, full = true) => {
  let seconds = time;

  let minutes = Math.floor(time / 60);
  seconds -= minutes * 60;

  let hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  let days = Math.floor(hours / 24);
  hours -= days * 24;

  let weeks = Math.floor(days / 7);
  days -= weeks * 7;

  let months = Math.floor(days / MONTH);
}); */
