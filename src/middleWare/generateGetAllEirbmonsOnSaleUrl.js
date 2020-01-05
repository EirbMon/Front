const apiUrl = process.env.REACT_APP_APIURL;

const generateGetAllEirbmonsOnSaleUrl = () => (`${apiUrl}/api/eirbmon/forSale`);

export default generateGetAllEirbmonsOnSaleUrl;