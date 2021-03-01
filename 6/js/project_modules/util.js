// Меняем местами значения переменных
const swapPlaces = (min, max) => [min, max] = [max, min];

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

// Перетасовка массива
const shuffle = (items) => {

  for (let i = items.length - 1; i > 0; i--) {
    const j = getRandomIntInclusive(0, i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

// Массив случайной длинны с неповторяющимися элементами
const getArrayRandomLength = (items) => {
  return shuffle(items.slice()).slice(0, getRandomIntInclusive(1, items.length));
};

// Получить случайный элемент массива
const getRandomArrayElement = (items) => {
  return items[getRandomIntInclusive(0, items.length - 1)];
}

export {
  getRandomIntInclusive,
  getRandomInclusive,
  getArrayRandomLength,
  getRandomArrayElement
};
