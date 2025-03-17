import { getRandomArrayElement } from '../utils/common';

export const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1200,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'e4c3e4e6-9053-42ce-b747-e281315baa31',
      // 'e4c3e4e6-9213-42fe-b7c7-e281315baa32',
      'e4c3e4e6-1223-42ce-b747-f2567315caf51',
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 1400,
    dateFrom: '2019-07-10T22:50:56.845Z',
    dateTo: '2019-07-11T16:12:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: true,
    offers: [
      'a1b2c3d4-5678-9101-1121-314151617181',
      // 'a1b2c3d4-5678-9101-1121-314151617182',
      // 'a1b2c3d4-5678-9101-1121-314151617183',
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 1900,
    dateFrom: '2019-07-10T21:45:56.845Z',
    dateTo: '2019-07-11T17:47:13.375Z',
    destination: 'zke216cq-10xa-ye15-1477-4zk9a01edcab',
    isFavorite: false,
    offers: [
      'd4e5f6g7-8901-2345-6789-012345678901',
      // 'd4e5f6g7-8901-2345-6789-012345678902',
      // 'd4e5f6g7-8901-2345-6789-012345678903',
      // 'd4e5f6g7-8901-2345-6789-012345678904',
      'd4e5f6g7-8901-2345-6789-012345678905',
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 2500,
    dateFrom: '2019-07-10T23:05:56.845Z',
    dateTo: '2019-07-11T15:29:45.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcag',
    isFavorite: false,
    offers: [
      'd4e5f6g7-8901-2345-6789-012345678901',
      // 'd4e5f6g7-8901-2345-6789-012345678904',
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 1125,
    dateFrom: '2019-07-10T18:37:56.845Z',
    dateTo: '2019-07-11T12:22:19.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [
      'd4e5f6g7-8901-2345-6789-012345678902',
      // 'd4e5f6g7-8901-2345-6789-012345678905',
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 1415,
    dateFrom: '2019-07-10T21:00:56.845Z',
    dateTo: '2019-07-11T10:02:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: true,
    offers: [
      's3d4e5f6-7890-1234-5678-901234567100'
    ],
    type: 'ship'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 8000,
    dateFrom: '2019-07-10T20:55:56.845Z',
    dateTo: '2019-07-11T11:07:15.375Z',
    destination: 'cfe416cq-10xa-ye15-1477-4zk9a01edcab',
    isFavorite: true,
    offers: [
      'c3d4e5f6-7890-1234-5678-901234567890'
    ],
    type: 'drive'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 9100,
    dateFrom: '2019-07-10T23:45:56.845Z',
    dateTo: '2019-07-11T13:22:15.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-4zk9a01edcab',
    isFavorite: false,
    offers: [
      // 'b2c3d4e5-6789-0123-4567-890123456789',
      // 'b2c3d4e5-6789-0123-4567-890123456790',
      'b2c3d4e5-6789-0123-4567-890123456791',
    ],
    type: 'flight'
  },
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoints };
