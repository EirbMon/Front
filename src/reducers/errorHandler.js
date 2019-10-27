'use strict';

let initObj = {
    timeStamp : undefined,
    error: undefined,
    errorMessage: undefined,
};
export default function errorHandler(state, action) {

    let errorTab = {
        404: "Not Found",
        500: "Server Error Occurs",
        504: "Server Response Is Too Long",
        403: "You Are Not Authorized",
        407: "Invalid Data Form",
        502: "Unable To Reach The Server",
        409: "Unique Constraint Is Not Respected",
    };

    switch (action.type) {

        case "ERROR_OCCURS": {

            return Object.assign({}, state, initObj , {
                timeStamp : new Date(),
                error: action.payload,
                errorMessage: errorTab[action.payload] ? errorTab[action.payload] : "Unknown Error",
            } );
        }
        default: {
            // send back default datas for state
            return Object.assign({}, state, initObj );
        }
    }

}