const apiUrl = process.env.REACT_APP_APIURL;

const generateUpdateEirbmonOwnerUrl = () => (`${apiUrl}/api/eirbmon/updateOwner`);

export default generateUpdateEirbmonOwnerUrl;
