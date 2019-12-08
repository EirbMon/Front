import { GET_NEW_PUSHER_ID } from '../../constants/action-types';

export default function GetPusherID() {
    return (dispatch) => {
        dispatch({
            type : GET_NEW_PUSHER_ID,
            payload : null,
        }); 
    }
}