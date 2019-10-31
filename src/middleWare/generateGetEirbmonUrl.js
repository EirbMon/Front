'use strict';

const apiUrl = process.env.REACT_APP_APIURL;

export default function generateGetEirbmonUrl() {
    return apiUrl + "api/catalogItem/search";
}