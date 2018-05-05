'use strict';

const request = (method, url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.response) {
        resolve(JSON.parse(xhr.response));
      }
    };

    xhr.onerror = () => {
      reject('Unable to process XMLHttpRequest');
    };

    xhr.open(method, url);
    xhr.send();
  });
};

module.exports = request;