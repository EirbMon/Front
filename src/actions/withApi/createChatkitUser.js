export default function createUserChatkit(link, user) {
    return (dispatch, getState, api) => api.post(link, user)
        .then(() => {
            console.log('sucess')
        })
        .catch(err => console.error('action', err))
}
