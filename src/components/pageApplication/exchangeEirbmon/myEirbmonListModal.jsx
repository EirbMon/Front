import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import ModalEirbmon from '../../utils/modalEirbmon';
import MyEirbmonList from './myEirbmonList';

const EirbexModal = ({ setMyForm, selectedEirbmonId, classeButton }) => {
    const ThisWillWork = forwardRef(() => <MyEirbmonList setMyForm={(value) => setMyForm(value)} selectedEirbmonId={selectedEirbmonId} />);

    return (
        <ModalEirbmon classeButton={classeButton}>
            <ThisWillWork />
        </ModalEirbmon>
    );
};

EirbexModal.propTypes = {
    classeButton: PropTypes.string,
    setMyForm: PropTypes.func,
    selectedEirbmonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default EirbexModal;
