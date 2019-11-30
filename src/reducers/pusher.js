import Pusher from 'pusher-js';
import generatePusherAuthenUrl from '../middleWare/generatePusherAuthenUrl';

export default function pusher(state, action) {
    switch (action.type) {
        default: {
            const pusherObject = new Pusher('1584d8f85246e88b597f', {
                cluster: 'eu',
                forceTLS: true,
                authEndpoint: generatePusherAuthenUrl,
                auth: {
                    params: {
                        param1: sessionStorage.getItem('email'),
                        param2: 'vous pouvez mettre ce que vous voulez',
                    },
                },
            });

            return { ...state, pusher: pusherObject };
        }
    }
}
