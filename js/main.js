'use strict'

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  if (min >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min: false + ': max меньше или равен min';
  }

  return false + ': min меньше нуля';
}

const getRandomInclusive = (min, max, numberDigit) => {

  if (min >= 0) {

    if (!numberDigit) {
      // https://qna.habr.com/q/493201
      const getNumberDigit = (number) => number.toString().includes('.') ? number.toString().split('.').pop().length : 0;
      numberDigit = Math.max(getNumberDigit(min), getNumberDigit(max));
    }

    return (max > min) ? (Math.random() * (max - min) + min).toFixed(numberDigit) : false + ': max меньше или равен min';
  }

  return false + ': min меньше нуля';
}

getRandomIntInclusive(0, 10);
getRandomInclusive(2, 10, 5);

/* for (let i = 0; i < 1000; i++) {
  const min = 1;
  const max = 10;

  let number;

  number = getRandomIntInclusive(min, max);
  //number = getRandomInclusive(min, max, 5);

  console.log(number);

  if (number == max) {
    console.log('max: ' +  number);
  }

  if (number == min) {
    console.log('min: ' +  number);
  }

  if (number > max) {
    console.log('error max: ' +  number);
  }

  if (number < min) {
    console.log('error min: ' +  number);
  }
} */
