const disconnect = (history) => {
    sessionStorage.clear();
    history.push('/login');
};

export default disconnect;
