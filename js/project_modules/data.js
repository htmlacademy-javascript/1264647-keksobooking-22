import {
  getRandomIntInclusive,
  getRandomInclusive,
  getArrayRandomLength,
  getRandomArrayElement

} from './util.js';

const [FIRST_ELEMENT, LAST_ELEMENT] = [1, 8];
const [MIN_PRICE, MAX_PRICE] = [100, 10000];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const [MIN_ROOMS, MAX_ROOMS] = [2, 8];
const [MIN_QUESTS, MAX_QUESTS] = [2, 20];
const TIME_EXAMPLES = ['12:00', '13:00', '14:00'];
const TOTAL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TOTAL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const [X_MIN, X_MAX] = [35.65000, 35.70000];
const [Y_MIN, Y_MAX] = [139.70000, 139.80000];
const DIGIT_NUMBER = 5;

// Создаем массив объявлений
const createAd = () => {
  const [xCoordinate, yCoordinate] = [
    getRandomInclusive(X_MIN, X_MAX, DIGIT_NUMBER),
    getRandomInclusive(Y_MIN, Y_MAX, DIGIT_NUMBER),
  ];

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(FIRST_ELEMENT, LAST_ELEMENT) + '.png',
    },

    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: xCoordinate + ', ' + yCoordinate,
      price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntInclusive(MIN_QUESTS, MAX_QUESTS),
      checkin: getRandomArrayElement(TIME_EXAMPLES),
      checkout: getRandomArrayElement(TIME_EXAMPLES),
      features: getArrayRandomLength(TOTAL_FEATURES),
      description: 'Небольшая уютная квартира',
      photos: getArrayRandomLength(TOTAL_PHOTOS),
    },

    location: {
      x: xCoordinate,
      y: yCoordinate,
    },
  }
};

const createAds = (quantity) => new Array(quantity).fill('').map(() => createAd());

export { createAds };
