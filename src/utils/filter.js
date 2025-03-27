import {FilterType} from '../const';
import {isEventInFuture, isEventInPast, isEventSameOrInPast, isEventSameOrInFuture} from './date';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) => points.filter((point) => isEventInPast(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventSameOrInPast(point.dateFrom) && isEventSameOrInFuture(point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventInFuture(point.dateFrom)),
};

export {filter};
