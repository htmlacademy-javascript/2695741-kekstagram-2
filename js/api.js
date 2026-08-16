const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const loadPictures = () => fetch(`${BASE_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }

    return response.json();
  });

const uploadPicture = (body) => fetch(BASE_URL, {
  method: 'POST',
  body,
}).then((response) => {
  if (!response.ok) {
    throw new Error('Не удалось отправить форму');
  }
});

export {loadPictures, uploadPicture};
