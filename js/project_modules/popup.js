import { createAds } from './data.js';

const AD_QUANTITY = 10;
const ads = createAds(AD_QUANTITY);

const mapCanvas = document.querySelector('#map-canvas');
const mapPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
const readyAds = [];

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
    };

    if (htmlTag === 'img') {
      tag = `<img src="${element}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    }

    box.insertAdjacentHTML('beforeend', tag);
  });

  return box;
}

ads.forEach((ad) => {
  const mapPopup = mapPopupTemplate.cloneNode(true);

  mapPopup.querySelector('.popup__title').textContent = ad.offer.title;
  mapPopup.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapPopup.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  mapPopup.querySelector('.popup__type').textContent = compareTypes(ad.offer.type);
  mapPopup.querySelector('.popup__text--capacity').textContent =  `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  mapPopup.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const listFeatures = mapPopup.querySelector('.popup__features');
  addElements(listFeatures, ad.offer.features, 'li');

  mapPopup.querySelector('.popup__description').textContent = ad.offer.description;

  const boxPhotos = mapPopup.querySelector('.popup__photos');
  addElements(boxPhotos, ad.offer.photos, 'img');

  mapPopup.querySelector('.popup__avatar').src = ad.author.avatar;

  readyAds.push(mapPopup);
});

mapCanvas.appendChild(readyAds[0]);
