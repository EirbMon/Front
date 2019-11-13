const disconnect = (history) => {
    localStorage.removeItem('token');
    history.push('/login');
};

export default disconnect;
