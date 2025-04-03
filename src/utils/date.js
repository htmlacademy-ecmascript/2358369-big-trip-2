import { TimeFormat } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

function humanizeDate(date) {
  return date ? dayjs(date).format(TimeFormat.DATE_FORMAT) : '';
}

function humanizeTime(time) {
  return time ? dayjs(time).format(TimeFormat.TIME_FORMAT) : '';
}

function humanizeDateTime(dateTime) {
  return dateTime ? dayjs(dateTime).format(TimeFormat.DATE_TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  const difference = dayjs.duration(date1.diff(date2));

  const normalFormat = 'DD[D] HH[H] mm[M]';
  const format = 'HH[H] mm[M]';
  const hoursMinutes = difference.format(format);
  const days = parseInt(difference.asDays(),10);


  const bigDate = `${days}D ${hoursMinutes}`.replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
  const normalDate = difference.format(normalFormat).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');

  return days > 30 ? bigDate : normalDate;
}

function isEventInPast(pointDate) {
  return pointDate && dayjs().isAfter(pointDate);
}

function isEventInFuture(pointDate) {
  return pointDate && dayjs().isBefore(pointDate);
}

function isEventSameOrInFuture(pointDate) {
  return pointDate && dayjs().isSameOrBefore(pointDate);
}

function isEventSameOrInPast(pointDate) {
  return pointDate && dayjs().isSameOrAfter(pointDate);
}

function getDate(date) {
  return new Date(date);
}

export { getDate, isEventSameOrInPast, isEventSameOrInFuture, isEventInFuture, isEventInPast, humanizeDate, getTimeDifference, humanizeDateTime, humanizeTime };
