const apiUrl = process.env.REACT_APP_APIURL;

const generateGetOwnerEirbmonUrl = () => (`${apiUrl}/api/eirbmon/owner/`);

export default generateGetOwnerEirbmonUrl;
