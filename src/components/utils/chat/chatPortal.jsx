import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ChatScreen from '../../utils/chat';
import PropTypes from 'prop-types';

const chatChannelId = {
    salon1: "aa6f7236-38f6-47ec-989c-4b3d0f0c6d56",
    salon2: "0102edfe-76fe-4c1e-893c-069c0283d4b5",
    salon3: "1b3b6e22-9d72-4224-8f84-0bcebe60659d",
    salonGlobal: "70922fc5-3e1e-4330-ad62-4a301c07853c"
}

const ChatPortal = ({ salon }) => {
    const [portalEl, setPortalEl] = useState(document.getElementById('drawer-chat'));
    var refreshId = setInterval(() => {
        if (document.getElementById('drawer-chat')) {
            setPortalEl(document.getElementById('drawer-chat'))
            clearInterval(refreshId);

            return 0;
        }
    }, 100);
    
    return (
        portalEl ? (
            ReactDOM.createPortal(
                <ChatScreen chatChannel={chatChannelId[salon]} />,
                portalEl,
            )
        ) : null
    )
}

ChatPortal.propTypes = {
    salon: PropTypes.string,
};

export default ChatPortal;
