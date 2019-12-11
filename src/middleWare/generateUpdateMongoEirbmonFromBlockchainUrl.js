const apiUrl = process.env.REACT_APP_APIURL;

const generateUpdateMongoEirbmonFromBlockchainUrl = () => (`${apiUrl}/api/eirbmon/update`);

export default generateUpdateMongoEirbmonFromBlockchainUrl;