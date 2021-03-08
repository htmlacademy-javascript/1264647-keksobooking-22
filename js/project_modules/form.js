import { sendData } from './api.js';
import { rollBackMap } from './map.js';
import { showNotice } from './notification.js';

const formFilter = document.querySelector('.map__filters');
const formAd = document.querySelector('.ad-form');
const formAdReset = formAd.querySelector('.ad-form__reset');

const resetFormMap = () => {
  formFilter.reset();
  formAd.reset();
  rollBackMap();
}

const onFormSend = () => {
  showNotice();
  resetFormMap();
};

const onFail = () => {
  showNotice('fail');
};

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onFormSend(),
    () => onFail(),
    new FormData(evt.target),
  );
});

//Возвращаем карту к изначальному состоянию через reset
formAdReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormMap();
});
