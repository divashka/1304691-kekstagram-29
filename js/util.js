const DELAY_ALERT_RENDER = 500;
const DELAY_FILTER_RENDER = 500;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createUniqueRandomIdGenerator = (min, max) => {
  const generatedValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (generatedValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    generatedValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const openErrorAlert = (message) => {
  const alertContainerNode = document.createElement('div');
  document.body.append(alertContainerNode);
  alertContainerNode.classList.add('error-alert-container');

  const alertNode = document.createElement('div');
  alertNode.classList.add('error-alert');
  alertNode.textContent = message;
  alertContainerNode.append(alertNode);

  setTimeout(() => alertContainerNode.remove(), DELAY_ALERT_RENDER);
};

const debounce = (callback, timeoutDelay = DELAY_FILTER_RENDER) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { createUniqueRandomIdGenerator, isEscapeKey, openErrorAlert, debounce };
