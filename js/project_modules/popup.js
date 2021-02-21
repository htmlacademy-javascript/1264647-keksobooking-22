const mapCanvas = document.querySelector('#map-canvas');
const mapPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

const compareTypes = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};

const addElements = (parent, items, htmlTag) => {
  parent.innerHTML = '';

  items.forEach((item) => {
    let childTag;

    if (htmlTag === 'li') {
      childTag = `<li class="popup__feature popup__feature--${item}"></li>`;
    }

    if (htmlTag === 'img') {
      childTag = `<img src="${item}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    }

    parent.insertAdjacentHTML('beforeend', childTag);
  });

  if (!parent.hasChildNodes()) {
    parent.classList.add('hidden');
  }

  return parent;
}

const createPopup = (ad) => {
  const mapPopup = mapPopupTemplate.cloneNode(true);
  let element;
  const hideElement = (item) => item.classList.add('hidden');

  //Аватарка
  element = mapPopup.querySelector('.popup__avatar');
  if (ad.author.avatar) {
    element.src = ad.author.avatar;
  } else {
    hideElement(element);
  }

  //Заголовок
  element = mapPopup.querySelector('.popup__title');
  if (ad.offer.title) {
    element.textContent = ad.offer.title;
  } else {
    hideElement(element);
  }

  //Адрес
  element = mapPopup.querySelector('.popup__text--address');
  if (ad.offer.address) {
    element.textContent = ad.offer.address;
  } else {
    hideElement(element);
  }

  //Цена
  element = mapPopup.querySelector('.popup__text--price');
  if (ad.offer.price) {
    element.innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;
  } else {
    hideElement(element);
  }

  //Тип жилья
  element = mapPopup.querySelector('.popup__type');
  if (ad.offer.type) {
    element.textContent = compareTypes(ad.offer.type);
  } else {
    hideElement(element);
  }

  //Вместимость жилья
  element = mapPopup.querySelector('.popup__text--capacity');
  if (ad.offer.rooms && ad.offer.guests) {
    element.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    hideElement(element);
  }

  //Время аренды
  element = mapPopup.querySelector('.popup__text--time');
  if (ad.offer.checkin && ad.offer.checkout) {
    element.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    hideElement(element);
  }

  //Описание жилья
  element = mapPopup.querySelector('.popup__description');
  if (ad.offer.description) {
    element.textContent = ad.offer.description;
  } else {
    hideElement(element);
  }

  //Фичи
  element = mapPopup.querySelector('.popup__features');
  addElements(element, ad.offer.features, 'li');

  //Фотографии жилья
  element = mapPopup.querySelector('.popup__photos');
  addElements(element, ad.offer.photos, 'img');

  mapCanvas.appendChild(mapPopup);
};

export { createPopup };
