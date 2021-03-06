
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

export { getData };
