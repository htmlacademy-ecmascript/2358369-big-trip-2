import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT } from './consts';

dayjs.extend(utc);
dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}
function humanizePointTime(time) {
  return time ? dayjs.utc(time).format(TIME_FORMAT) : '';
}
function humanizeDateTime(dateTime) {
  return dateTime ? dayjs.utc(dateTime).format(DATE_TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  const difference = dayjs.duration(date1.diff(date2));

  const format = 'DD[D] HH[H] mm[M]';

  return difference.format(format).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


export { getRandomArrayElement, humanizePointDate, humanizePointTime, getTimeDifference, humanizeDateTime, capitalizeWord };
