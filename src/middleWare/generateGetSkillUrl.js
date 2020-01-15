const apiUrl = process.env.REACT_APP_APIURL;

const generateGetSkillUrl = () => (`${apiUrl}/api/skill`);

export default generateGetSkillUrl;
