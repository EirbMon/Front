import getJwt from './getJwt';

const checkAuthen = ({ history }) => {
    const jwt = getJwt();

    if (!jwt) {
        history.push('/login');
    }
};

export default checkAuthen;
