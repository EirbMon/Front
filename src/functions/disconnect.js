export const disconnect = (history) => {
    localStorage.removeItem('token');
    history.push('/login');
}
