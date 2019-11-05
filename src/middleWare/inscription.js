import Requetes from '../api/index';

const inscription = (e, user, history) => {
    e.preventDefault();

    const { post } = Requetes;

    post('https://localhost:8080/api/users', {
        username: user.username,
        password: user.password,
        email: user.email,
    })
        .then((json) => {
            post('https://localhost:8080/api/connexion', {
                username: json.username,
                password: json.password,
            })
                .then((jsonCo) => {
                    if ('false' === jsonCo.check_user || 'false' === jsonCo.check_password) {
                        console.log('Cet utilisateur existe pas');
                    }

                    if (jsonCo.token) {
                        localStorage.setItem('token', jsonCo.token);
                        localStorage.setItem('username', user.username);
                        history.push('/profil');
                    }
                });
        });
};

export default inscription;
