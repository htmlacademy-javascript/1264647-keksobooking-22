//Вкл - Выкл элементов
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

//Получение адреса метки
const getAddress = (marker, input) => {
  const source = marker.getLatLng();
  input.value = (source.lat).toFixed(5) + ', '+ (source.lng).toFixed(5);
};

//Проверка событий
const isClickEvent = (evt) => {
  return evt.type === 'click';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export {
  disableElements,
  enableElements,
  getAddress,
  isClickEvent,
  isEscEvent
};
