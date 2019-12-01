import React, { forwardRef } from 'react';
import Eirbdex from '../../utils/eirbdex';
import Modal from '../../utils/modal';

const ModalEirbdex = () => {
    const EirbdexForward = forwardRef(() => <Eirbdex />);

    return (
        <Modal>
            <EirbdexForward />
        </Modal>
    );
};

export default ModalEirbdex;
