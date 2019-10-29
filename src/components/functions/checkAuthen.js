import { getJwt } from './getJwt';

export const checkAuthen = ({ history }) => {
    const jwt = getJwt();

    if (!jwt) {
        console.log('pas connecté');
        //history.push('/signup');
    }
}
