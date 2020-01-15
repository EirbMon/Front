const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEirbmonUrl = () => (`${apiUrl}/api/eirbmon/addFirstEirbmon`);

export default generateGetEirbmonUrl;
