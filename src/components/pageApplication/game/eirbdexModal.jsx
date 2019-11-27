import React, { forwardRef } from 'react';
import EirbdexTool from '../../utils/eirbdex';
import ModalEirbmon from '../../utils/modalEirbmon';

const EirbexModal = () => {
    const ThisWillWork = forwardRef(() => <EirbdexTool />);

    return (
        <ModalEirbmon>
            <ThisWillWork />
        </ModalEirbmon>
    );
};

export default EirbexModal;
