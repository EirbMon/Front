const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEirbmonUrl = () => (`${apiUrl}/api/eirbmon/owner/`);

export default generateGetEirbmonUrl;
