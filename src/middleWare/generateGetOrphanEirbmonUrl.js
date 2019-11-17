const apiUrl = process.env.REACT_APP_APIURL;

const generateGetOrphanEirbmonUrl = () => (`${apiUrl}/api/eirbmon`);

export default generateGetOrphanEirbmonUrl;