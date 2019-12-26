const apiUrl = process.env.REACT_APP_APIURL;

const generateGetEvolutionUrl = (eirbmon_id) => (`${apiUrl}/api/eirbmon/evolution/${eirbmon_id}`);

export default generateGetEvolutionUrl;
