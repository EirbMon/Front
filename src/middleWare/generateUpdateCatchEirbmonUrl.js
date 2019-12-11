const apiUrl = process.env.REACT_APP_APIURL;

const generateUpdateCatchEirbmonUrl = () => (`${apiUrl}/api/eirbmon/catch`);

export default generateUpdateCatchEirbmonUrl;
