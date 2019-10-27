'use strict';
import 'isomorphic-fetch';

const login = process.env.REACT_APP_LOGIN;
const password = process.env.REACT_APP_PASSWORD;

export default function post(url, data) {

  let headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  };

  headers.Authorization = 'Basic ' + btoa(login + ':' + password);

  return fetch(url,
    {
      headers: new Headers(headers),
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => {

      // check status
      if (res.status == 200 ) { //handle serial number generation for example
        return res.json(); 
      } else if (res.status == 201) { // handle catalog item addition for example
        return res;
      } else {
        return Promise.reject(res.status);
      }

    });
}