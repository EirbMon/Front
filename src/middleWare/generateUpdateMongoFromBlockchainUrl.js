const apiUrl = process.env.REACT_APP_APIURL;

const generateUpdateMongoFromBlockchainUrl = () => (`${apiUrl}/api/eirbmon/update`);

export default generateUpdateMongoFromBlockchainUrl;