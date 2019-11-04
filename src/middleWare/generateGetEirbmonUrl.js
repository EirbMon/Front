const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEirbmonUrl = () => (`${apiUrl}api/catalogItem/search`);

export default generateGetEirbmonUrl;
