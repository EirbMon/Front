const apiUrl = process.env.REACT_APP_APIURL;

const generatePutUnsaleEirbmonUrl = () => (`${apiUrl}/api/eirbmon/unsale`);

export default generatePutUnsaleEirbmonUrl;