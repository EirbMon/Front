import 'isomorphic-fetch';

const login = process.env.REACT_APP_LOGIN;
const password = process.env.REACT_APP_PASSWORD;

export default function put(url, data) {
    console.log("Bonjour PUT ENVOIE url : " + url);
    const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    };

    headers.Authorization = `Basic ${btoa(`${login}:${password}`)}`;

    return fetch(url, {
        headers: new Headers(headers),
        method: 'PUT',
        body: JSON.stringify(data),
    })
        .then((res) => {
            console.log("Bonjour PUT REPONSE");
            console.log("reponse: " + res);
            if (200 === res.status || 201 === res.status) {
                return res.json();
            }

            return Promise.reject(res.status);
        })
        .catch((err) => {console.log("Bonjour PUT ERR " + err);});
}
