import { createAds } from './data.js';

const AD_QUANTITY = 10;
const ads = createAds(AD_QUANTITY);

const mapCanvas = document.querySelector('#map-canvas');
const mapPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragmentAds = document.createDocumentFragment();

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

const addElements = (box, items, htmlTag) => {
  box.innerHTML = '';

  items.forEach((element) => {
    let tag;

    if (htmlTag === 'li') {
      tag = `<li class="popup__feature popup__feature--${element}"></li>`;
    }

    if (htmlTag === 'img') {
      tag = `<img src="${element}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    }

    box.insertAdjacentHTML('beforeend', tag);
  });

  return box;
}

const addData = (data, stringData, parentElement, classElement, dataTwo = 1) => {
  const element = parentElement.querySelector(classElement);

  if (data === null ||
      dataTwo === null ||
      data === undefined ||
      dataTwo === undefined ||
      data === 'null, null' ||
      data === '') {

    element.classList.add('hidden');
    return
  }

  element.textContent = stringData;
};

const hideElement = (element) => {
  if (element.hasChildNodes()) {
    return
  }

  element.classList.add('hidden');
};

ads.forEach((ad) => {
  const mapPopup = mapPopupTemplate.cloneNode(true);

  addData(ad.offer.title, ad.offer.title, mapPopup, '.popup__title');
  addData(ad.offer.address, ad.offer.address,  mapPopup, '.popup__text--address');
  addData(ad.offer.price, `${ad.offer.price} ₽/ночь`, mapPopup, '.popup__text--price');
  addData(ad.offer.type, compareTypes(ad.offer.type), mapPopup, '.popup__type');
  addData(ad.offer.rooms, `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`, mapPopup, '.popup__text--capacity', ad.offer.guests);
  addData(ad.offer.checkin, `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`, mapPopup, '.popup__text--time', ad.offer.checkout);
  addData(ad.offer.description, ad.offer.description, mapPopup, '.popup__description');

  const listFeatures = mapPopup.querySelector('.popup__features');
  addElements(listFeatures, ad.offer.features, 'li');
  hideElement (listFeatures);

  const boxPhotos = mapPopup.querySelector('.popup__photos');
  addElements(boxPhotos, ad.offer.photos, 'img');
  hideElement (boxPhotos);

  if (ad.author.avatar === '') {
    mapPopup.querySelector('.popup__avatar').classList.add('hidden');

  } else {
    mapPopup.querySelector('.popup__avatar').src = ad.author.avatar;
  }

  fragmentAds.appendChild(mapPopup);
});

mapCanvas.appendChild(fragmentAds.children[0]);
