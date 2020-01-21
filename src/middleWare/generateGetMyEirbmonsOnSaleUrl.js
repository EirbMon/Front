const apiUrl = process.env.REACT_APP_APIURL;

const generateGetMyEirbmonsOnSaleUrl = (eirbmon_id) => (`${apiUrl}/api/eirbmon/forSale`);

export default generateGetMyEirbmonsOnSaleUrl;
