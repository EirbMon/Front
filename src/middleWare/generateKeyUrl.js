const apiUrl = process.env.REACT_APP_APIURL;

const generateKeyUrl = () => (`${apiUrl}/api/key`);

export default generateKeyUrl;
