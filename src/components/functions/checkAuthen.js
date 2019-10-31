import { getJwt } from './getJwt';

export const checkAuthen = ({ history }) => {
    const jwt = getJwt();

    if (!jwt) {
        history.push('/login');
    }
}
