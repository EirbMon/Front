const apiUrl = process.env.REACT_APP_APIURL;

const generateGetMyEirbmonsOnSaleUrl = (owner_id) => (`${apiUrl}/api/eirbmon/forSale/${owner_id}`);

export default generateGetMyEirbmonsOnSaleUrl;
