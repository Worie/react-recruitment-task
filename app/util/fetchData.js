import 'whatwg-fetch';

export default (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    });
};
