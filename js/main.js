'use strict'

const swapPlaces = (min, max) => [max, min] = [min, max];

// УТИЛИТАРНЫЕ ФУНКЦИИ
// Возвращаем целое число
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  if (min >= 0 && max >= 0 && min !== max) {
    if (max < min) {
      swapPlaces(min, max);
    }

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return null;
};

// Возвращаем число с плавающей точкой
const getRandomInclusive = (min, max, numberDigit) => {

  if (min >= 0 && max >= 0 && min !== max) {
    if (max < min) {
      swapPlaces(min, max);
    }

    return parseFloat((Math.random() * (max - min) + min).toFixed(numberDigit));
  }

  return null;
};

// СОЗДАЕМ МАССИВ ОБЪЯВЛЕНИЙ
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIME_EXAMPLES = ['12:00', '13:00', '14:00'];
const TOTAL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TOTAL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const AD_COUNT = 10;

const getRandomArrayElement = (array) => {
  return array[getRandomIntInclusive(0, array.length - 1)];
}

//массив случайной длинны с неповторяющимися элементами
const getArrayRandomLenght = (array) => {
  return array.slice(0, getRandomIntInclusive(1, array.length)).sort(() => Math.random() - 0.5);
}

const createAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
    },

    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: getRandomInclusive(34.65000, 34.70000, 5)+ ', ' + getRandomInclusive(138.70000, 138.80000, 5),
      price: getRandomIntInclusive(100, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntInclusive(1, 8),
      guests: getRandomIntInclusive(1, 20),
      checkin: getRandomArrayElement(TIME_EXAMPLES),
      checkout: getRandomArrayElement(TIME_EXAMPLES),
      features: getArrayRandomLenght(TOTAL_FEATURES),
      description: 'Небольшая уютная квартира',
      photos: getArrayRandomLenght(TOTAL_PHOTOS),
    },

    location: {
      x: getRandomInclusive(35.65000, 35.70000, 5),
      y: getRandomInclusive(139.70000, 139.80000, 5),
    },
  }
};

const createAds = (count) => new Array(count).fill('').map(() => createAd());
createAds(AD_COUNT);
