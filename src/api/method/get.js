import 'isomorphic-fetch';

const login = process.env.REACT_APP_LOGIN;
const password = process.env.REACT_APP_PASSWORD;

export default function get(url) {
    const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    };

    headers.Authorization = `Basic ${btoa(`${login}:${password}`)}`;
    return fetch(url, {
        headers: new Headers(headers),
        method: 'GET',

    })
        .then((res) => {
            if (200 === res.status) {
                return res.json();
            }

            return Promise.reject(res.status);
        });
}
