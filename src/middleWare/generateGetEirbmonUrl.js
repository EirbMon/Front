const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEirbmonUrl = (owner_id) => (`${apiUrl}/api/eirbmon`);

export default generateGetEirbmonUrl;
