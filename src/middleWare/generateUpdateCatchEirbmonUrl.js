const apiUrl = process.env.REACT_APP_APIURL;

const generateCatchEirbmonUrl = () => (`${apiUrl}/api/eirbmon/catch`);

export default generateCatchEirbmonUrl;
