const apiUrl = process.env.REACT_APP_APIURL;

const generatePutEirbmonOnSaleUrl = () => (`${apiUrl}/api/eirbmon/forSale`);

export default generatePutEirbmonOnSaleUrl;