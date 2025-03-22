import { FilterType } from '../consts';
import { isEventInPast, isEventInPresent, isEventInFuture } from './date';


const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) => points.filter((point) => isEventInPast(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventInPresent(point.dateFrom)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventInFuture(point.dateFrom)),
};

export { filter };
