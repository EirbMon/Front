'use strict';
import 'isomorphic-fetch';

const login = process.env.REACT_APP_LOGIN;
const password = process.env.REACT_APP_PASSWORD;

export default function put(url, data) {

  let headers = {
    'Content-Type': 'application/json'
  };

  headers.Authorization = 'Basic ' + btoa(login + ':' + password);

  return fetch(url,
    {
      headers: new Headers(headers),
      method: 'PUT',
      body: JSON.stringify(data),
    }).then((res) => {

      // check status
      if (res.status == 200 || res.status == 201) {
        return res;
      } else {
        return Promise.reject(res.status);
      }

    });
}