const apiUrl = process.env.REACT_APP_APIURL;

const generateUpdateMongoEirbmonFromBlockchainUrl = (idInBlockchain) => (`${apiUrl}/api/eirbmon/bc/${idInBlockchain}`);

export default generateUpdateMongoEirbmonFromBlockchainUrl;