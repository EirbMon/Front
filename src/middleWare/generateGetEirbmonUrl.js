const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEirbmonUrl = (owner_id) => (`${apiUrl}/api/eirbmon`);  // /owner/${owner_id}`);

export default generateGetEirbmonUrl;
