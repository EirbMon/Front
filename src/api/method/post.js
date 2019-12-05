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
            console.log(res);
            if (200 === res.status) { // handle serial number generation for example
                return res.json();
            } if (201 === res.status) { // handle catalog item addition for example
                return res;
            }

            return Promise.reject(res.status);
        });
}
