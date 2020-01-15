import 'isomorphic-fetch';

const login = process.env.REACT_APP_LOGIN;
const password = process.env.REACT_APP_PASSWORD;

export default function post(url, data) {
    const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    };

    headers.Authorization = `Basic ${btoa(`${login}:${password}`)}`;

    return fetch(url, {
        headers: new Headers(headers),
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => {
        // check status
            if (200 === res.status || 204 === res.status) {
                return res.json();
            } if (201 === res.status) { 
                return res;
            }

            return Promise.reject(res.status);
        });
}
