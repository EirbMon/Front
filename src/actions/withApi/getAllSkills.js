import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateGetSkillUrl from '../../middleWare/generateGetSkillUrl';

export default function getAllSkills(skills_id) {
    return (dispatch, getState, api) => api.get(generateGetSkillUrl(skills_id))
        .then(
            (res) => {
                dispatch({
                    type: LOAD_EIRBMON_SUCCESS,
                    payload: res,
                });

                if (res.length === 0)
                    return Promise.reject("No Skills found");
                
                return Promise.resolve(res);
            })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });
            return Promise.reject(err);
        });
}
