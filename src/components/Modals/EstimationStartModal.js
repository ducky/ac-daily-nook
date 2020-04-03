import React from 'react';

import useInput from '../../hooks/useInput';

import ModalWrapper from './ModalWrapper';
import Input from '../Input';

const EstimationStartModal = ({ onClose, ...props }) => {
  const issue = useInput('', value => !!value);

  const onCloseModal = () => {
    onClose(issue.value);
  };

  return (
    <ModalWrapper {...props} title="Start Estimation" closeText="Start Estimation" onClose={onCloseModal} width={500} locked={true} valid={!issue.invalid}>
      <p>Which issue are we estimating, bub?</p>
      <Input title="Issue Key (ex: BUG-123)" autoFocus {...issue} />
    </ModalWrapper>
  );
};

export default EstimationStartModal;
