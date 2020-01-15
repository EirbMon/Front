import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../utils/modal';
import SelectEirbmon from './selectEirbmon';

const EirbexModal = ({ setMyEirbmon, selectedEirbmonId, classeButton }) => {
    const SelectEirbmonForward = forwardRef(() => <SelectEirbmon setMyEirbmon={(value) => setMyEirbmon(value)} selectedEirbmonId={selectedEirbmonId} />);

    return (
        <Modal classeButton={classeButton}>
            <SelectEirbmonForward />
        </Modal>
    );
};

EirbexModal.propTypes = {
    classeButton: PropTypes.string,
    setMyEirbmon: PropTypes.func,
    selectedEirbmonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default EirbexModal;
