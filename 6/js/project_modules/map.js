import { createAds } from './data.js';
import { createPopup } from './popup.js';

/* global L:readonly */
const AD_QUANTITY = 10;
const [TOKYO_LAT, TOKYO_LNG] = [35.6895, 139.692];
const TOKYO_ZOOM = 10;

const MAIN_ICON_URL = '../img/main-pin.svg';
const MAIN_ICON_SIZES = [50, 82];
const MAIN_ANCHOR_SIZES = [25, 82];

const [MAIN_MARKER_LAT, MAIN_MARKER_LNG] = [35.6895, 139.692];

const ICON_URL = '../img/pin.svg';
const ICON_SIZES = [25, 41];
const ANCHOR_SIZES = [12.5, 41];

const ads = createAds(AD_QUANTITY);

const formMap = document.querySelector('.map__filters');
const formMapElements = formMap.querySelectorAll('.map__filter, .map__features');

const formAd = document.querySelector('.ad-form');
const formAdElements = formAd.querySelectorAll('.ad-form-header, .ad-form__element');

const addressAd = formAd.querySelector('#address');

const disableElements = (parent, children) => {
  parent.classList.add('ad-form--disabled');

  for (const child of children) {
    child.disabled = true;
  }
};

const enableElements = (parent, children) => {
  parent.classList.remove('ad-form--disabled');

  for (const child of children) {
    child.disabled = false;
  }
};

const getAddress = (marker, input) => {
  const source = marker.getLatLng();
  input.value = (source.lat).toFixed(5) + ', '+ (source.lng).toFixed(5);
};


//Деактивация фильтра карты и формы заполнения объявления
disableElements(formMap, formMapElements);
disableElements(formAd, formAdElements);


//Иницилизация карты, фильтра карты и формы заполнения объявления
const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,

  }, TOKYO_ZOOM);

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
  iconUrl: MAIN_ICON_URL,
  iconSize: MAIN_ICON_SIZES,
  iconAnchor: MAIN_ANCHOR_SIZES,
});

const mainMarker = L.marker(
  {
    lat: MAIN_MARKER_LAT,
    lng: MAIN_MARKER_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

ads.forEach((ad) => {

  const markerIcon = L.icon({
    iconUrl: ICON_URL,
    iconSize: ICON_SIZES,
    iconAnchor: ANCHOR_SIZES,
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

mainMarker.on('move', (evt) => getAddress(evt.target, addressAd));
