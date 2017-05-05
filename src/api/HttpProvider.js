class HttpProvider {

  static get = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          }
        }
      };

      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();
    });
  };

  static post = (url, data) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      xhr.send(JSON.stringify(data));
    });
  };
}

export { HttpProvider };

