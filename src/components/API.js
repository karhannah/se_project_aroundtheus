// b73a4638-eb7a-419c-8b34-f34f4d770b05 auth token

export default class Api {
  constructor(key, url) {
    this._key = key;
    this._url = url;
  }

  test() {
    fetch(url, {
      headers: {
        authorization: key
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}