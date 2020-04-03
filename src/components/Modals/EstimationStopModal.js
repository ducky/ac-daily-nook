import React from 'react';

import useInput from '../../hooks/useInput';

import ModalWrapper from './ModalWrapper';
import Input from '../Input';

const EstimationStopModal = ({ onClose, ...props }) => {
  const points = useInput('', value => !!value);

  const onCloseModal = () => {
    onClose(points.value);
  };

  return (
    <ModalWrapper {...props} title="Stop Issue Estimation" closeText="Complete Issue" onClose={onCloseModal} width={500} locked={true} valid={!points.invalid}>
      <p>How many story points were estimated for this issue?</p>
      <Input title="Story Points" type="text" autoFocus {...points} />
    </ModalWrapper>
  );
};

export default EstimationStopModal;
