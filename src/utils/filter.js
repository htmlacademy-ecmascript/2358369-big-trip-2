import { filterType } from '../consts';
import { isEventInPast, isEventInPresent, isEventInFuture } from './date';


const filter = {
  [filterType.EVERYTHING]: (points) => points.slice(),
  [filterType.PAST]: (points) => points.filter((point) => isEventInPast(point.dateFrom)),
  [filterType.PRESENT]: (points) => points.filter((point) => isEventInPresent(point.dateFrom)),
  [filterType.FUTURE]: (points) => points.filter((point) => isEventInFuture(point.dateFrom)),
};

export { filter };
