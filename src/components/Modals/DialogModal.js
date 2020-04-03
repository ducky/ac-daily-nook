import React, { PureComponent } from 'react';

import Input from '../Input';
import ModalWrapper from './ModalWrapper';

class DialogModal extends PureComponent {
  state = {
    value: '',
  };

  onClose = () => {
    this.props.onClose(this.state.value);
  };

  onChange = ({ target }) => {
    this.setState(state => ({
      [target.name]: target.value,
    }));
  };

  render() {
    const { ...props } = this.props;
    const { value } = this.state;
    return (
      <ModalWrapper {...props} width={500} locked={true} title={props.title || 'Dialog'} valid={value.length > 0} onClose={this.onClose} modalType="dialog">
        <p>{props.message}</p>
        <Input name="value" onChange={this.onChange} value={value} />
      </ModalWrapper>
    );
  }
}

export default DialogModal;
