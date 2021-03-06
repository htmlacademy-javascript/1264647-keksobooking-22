const ALERT_SHOW_TIME = 5000;
const alertPlace = document.querySelector('.map__canvas');

const showAlert = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'absolute';
  messageContainer.style.zIndex = 10000;
  messageContainer.style.top = 0;
  messageContainer.style.right = 0;
  messageContainer.style.left = 0;
  messageContainer.style.padding = '20px 50px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.fontSize = '25px';
  messageContainer.style.color = '#003153';
  messageContainer.style.backgroundColor = '#9b2d30';

  messageContainer.textContent = message;

  alertPlace.append(messageContainer);

  setTimeout(
    () => messageContainer.remove(),

    ALERT_SHOW_TIME,
  );
}

export { showAlert }
