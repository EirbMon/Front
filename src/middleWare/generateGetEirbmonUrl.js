const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEirbmonUrl = (accountInfo) => (`${apiUrl}/getMyEirbmon?account=${accountInfo}`);

export default generateGetEirbmonUrl;
