'use strict';

const apiUrl = process.env.REACT_APP_APIURL;

export default function generateFindOneCatalogItemByReferenceUrl(reference = undefined) {
    return apiUrl + "api/catalogItem/search/findOneByReference?reference=" + reference
}