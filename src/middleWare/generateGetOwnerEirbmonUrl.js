const apiUrl = process.env.REACT_APP_APIURL;

const generateGetOwnerEirbmonUrl = (owner_id,number) => (`${apiUrl}/api/eirbmon/owner/${owner_id}/${number}`);

export default generateGetOwnerEirbmonUrl;
