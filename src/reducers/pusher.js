import Pusher from 'pusher-js';
import generatePusherAuthenUrl from '../middleWare/generatePusherAuthenUrl';
import { GET_NEW_PUSHER_ID } from '../constants/action-types';

export default function pusher(state, action) {
    switch (action.type) {
        case GET_NEW_PUSHER_ID: {
            const pusherObject = new Pusher('1584d8f85246e88b597f', {
                cluster: 'eu',
                forceTLS: true,
                authEndpoint: generatePusherAuthenUrl,
                auth: {
                    params: {
                        param1: sessionStorage.getItem('email'),
                        param2: sessionStorage.getItem('accountAddress'),
                    },
                },
            });

            return { ...state, pusher: pusherObject };
        }
        default: {
            return { ...state};
        }
    }
}
