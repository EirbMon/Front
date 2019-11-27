const disconnect = (history) => {
    sessionStorage.removeItem('token');
    history.push('/login');
};

export default disconnect;
