import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';
import generateUpdateCatchEirbmonUrl from '../../middleWare/generateUpdateCatchEirbmonUrl';

export default function updateCatchEirbmon(data) {
    console.log("Bonjour UPDATE CATCH EIEBRMON? URL: " + generateUpdateCatchEirbmonUrl() );
    console.log(data);
    return (dispatch, getState, api) => {api.put(generateUpdateCatchEirbmonUrl(), data)
        .then((res) => {
            console.log('update cactch')
            console.log(res)
            dispatch({
                type: SUCCESS_OCCURS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });
        });
    }
}
