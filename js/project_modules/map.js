import { createAds } from './data.js';
import { createPopup } from './popup.js';

/* global L:readonly */
const AD_QUANTITY = 10;
const ads = createAds(AD_QUANTITY);

const formMap = document.querySelector('.map__filters');
const formMapElements = formMap.querySelectorAll('.map__filter, .map__features');

const formAd = document.querySelector('.ad-form');
const formAdElements = formAd.querySelectorAll('.ad-form-header, .ad-form__element');

const addressAd = formAd.querySelector('#address');

const desableElements = (parent, children) => {
  parent.classList.add('ad-form--disabled');

  for (let element of children) {
    element.disabled = true;
  }
};

const enableElements = (parent, children) => {
  parent.classList.remove('ad-form--disabled');

  for (let element of children) {
    element.disabled = false;
  }
};

const getAddress = (marker, input) => {
  let source = marker.getLatLng();
  input.value = (source.lat).toFixed(5) + ', '+ (source.lng).toFixed(5);
};

//Деактивация фильтра карты и формы заполнения объявления
desableElements(formMap, formMapElements);
desableElements(formAd, formAdElements);

//Иницилизация карты, фильтра карты и формы заполнения объявления
const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map)
  .on('load', () => {
    enableElements(formMap, formMapElements);
    enableElements(formAd, formAdElements);
  });

//Создаем маркеры и балуны
const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
});

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

ads.forEach((ad) => {

  const markerIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });

  const marker = L.marker(
    {
      lat: ad.location.x,
      lng: ad.location.y,
    },
    {
      icon: markerIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createPopup(ad));
});

//Блокируем поле адресс для редактирования, передаем в него координаты меток
addressAd.readOnly = true;

getAddress(mainMarker, addressAd);

mainMarker.on('moveend', (evt) => getAddress(evt.target, addressAd));
