'use strict'

const swapPlaces = (min, max) => [max, min] = [min, max];

// Возвращаем целые числа
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
}

// Возвращаем числа с плавающей точкой
const getRandomInclusive = (min, max, numberDigit) => {

  if (min >= 0 && max >= 0 && min !== max) {
    if (max < min) {
      swapPlaces(min, max);
    }

    return parseFloat((Math.random() * (max - min) + min).toFixed(numberDigit));
  }

  return null;
}

getRandomIntInclusive(0, 10);
getRandomInclusive(2, 10, 5);
