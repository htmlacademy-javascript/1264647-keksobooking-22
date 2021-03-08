
const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {

      if (!response.ok) {
        throw true;
      }

      return response.json()
    })
    .then((ads) => onSuccess(ads))
    .catch(() => onFail());
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).
    then((response) => {
      if (!response.ok) {
        throw true;
      }
      onSuccess();
    })
    .catch(() => onFail());
};

export { getData, sendData };
