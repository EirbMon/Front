'use strict';

let initObj = {
    timeStamp : undefined,
    success: undefined,
    successMessage: undefined,
};
export default function successHandler(state, action) {

    let successTab = {
        200: "Done",
        201: "Successfuly Created",
    };

    switch (action.type) {

        case "SUCCESS_OCCURS": {
            return Object.assign({}, state, initObj , {
                timeStamp : new Date(),
                success: action.payload,
                successMessage: successTab[action.payload] ? successTab[action.payload] : "Done",
            } );
        }
        default: {
            // send back default datas for state
            return Object.assign({}, state, initObj );
        }
    }

}