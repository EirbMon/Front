import {LOAD_ACCOUNT_SUCCESS} from '../../constants/action-types';

export default function SetAccountInfo(account) {

    return (dispatch) => {
        console.log(account);
        dispatch({
            type : LOAD_ACCOUNT_SUCCESS,
            payload : account,
        }); 
    }
}