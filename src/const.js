const TimeFormat = {
  DATE_FORMAT: 'MMM D',
  DATE_TIME_FORMAT: 'DD/MM/YY HH:mm',
  TIME_FORMAT: 'HH:mm'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const BLANK_POINT = {
  'id': '007',
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': 'taxi'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const AUTHORIZATION = 'Basic n1k0m0c6or';

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

export { TimeFormat, FilterType, SortType, EVENT_TYPES, BLANK_POINT, UserAction, UpdateType, Mode, Method, AUTHORIZATION, END_POINT };
