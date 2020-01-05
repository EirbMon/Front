import React from 'react';
import Page from '../../utils/layout';
import EirbdexTool from '../../utils/eirbdex';
import ChatPortal from '../../utils/chat/chatPortal';

const Eirbdex = () => (
    <Page currentPage="Eirbdex">
        <ChatPortal salon="salonGlobal"/>
        <EirbdexTool />
    </Page>
)


export default Eirbdex;
