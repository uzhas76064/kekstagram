const PICTURES_URL = 'https://25.javascript.htmlacademy.pro/kekstagram/data';

const fetchPictures = (onSuccess) => {
  fetch(PICTURES_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export {fetchPictures};
