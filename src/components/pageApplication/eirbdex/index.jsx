import React, { useState } from 'react';
import Page from '../../utils/layout';
import EirbdexTool from '../../utils/eirbdex';
import ChatScreen from '../../utils/chat';
import ReactDOM from 'react-dom';

const Eirbdex = () => {
    const [portalEl, setPortalEl] = useState(document.getElementById('drawer-chat'));
    var refreshId = setInterval(() => {
        if (document.getElementById('drawer-chat')) {
            setPortalEl(document.getElementById('drawer-chat'))
            clearInterval(refreshId);
            return 0
        }
    }, 100);

    return (
        <Page currentPage="Eirbdex">
            <EirbdexTool />
            {portalEl ? (
                ReactDOM.createPortal(
                    <ChatScreen chatChannel="70922fc5-3e1e-4330-ad62-4a301c07853c" />,
                    portalEl,
                )
            ) : null}
        </Page>
    )
}

export default Eirbdex;
 