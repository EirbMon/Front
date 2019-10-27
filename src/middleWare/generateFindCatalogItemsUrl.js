'use strict';

const apiUrl = process.env.REACT_APP_APIURL;

export default function generateFindCatalogItemsUrl(search = undefined, rowsPerPage = 10, page = 0) {
    return apiUrl + "api/catalogItem/search/findDistinctByReferenceContainingIgnoreCaseOrDesignationContainingIgnoreCaseOrRevisionCodeContainingIgnoreCaseOrClassificationContainingIgnoreCaseOrListSerialNumber_CodeContainingIgnoreCase" +
    "?classification=" + search + "&designation=" + search + "&reference=" + search + "&revision=" + search + "&size=" + rowsPerPage + "&page=" + page + "&code=" + search + "&sort=designation";
}