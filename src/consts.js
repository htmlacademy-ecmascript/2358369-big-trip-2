const POINT_COUNT = 2;

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

const EVENT_TYPES = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

export { POINT_COUNT, DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT, EVENT_TYPES, FilterType, SortType };
