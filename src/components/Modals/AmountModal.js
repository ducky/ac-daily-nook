import React, { PureComponent } from 'react';
import styled from 'styled-components';

import EMOJI_MAP from 'constants/emojis';

import theme, { lighten } from 'styles/theme';
import { add, toNumber } from 'utils/number';

import Currency from 'components/Currency';
import Input from 'components/Input';
import ModalWrapper from './ModalWrapper';

const Details = styled.div`
  margin: 0 0 20px;

  .Details__title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .Details__item {
    display: flex;
    margin: 0 0 5px;

    &-label {
      width: 175px;
    }

    &-value {
      margin-left: auto;
    }
  }
`;

const getTransactionMessages = details => ({
  interest: {
    title: `${EMOJI_MAP[details.type]} ${details.name} - Interest Charge`,
    currentType: `Interest Amount`,
  },
  payment: {
    title: `${EMOJI_MAP[details.type]} ${details.name} - Payment`,
    currentType: `Payment Amount`,
  },
});

class DialogModal extends PureComponent {
  state = {
    amount: '',
  };

  onClose = () => {
    this.props.onClose(this.state.amount);
  };

  onChange = ({ target }) => {
    this.setState(state => ({
      [target.name]: target.value,
    }));
  };

  render() {
    const { transactionType, details, ...props } = this.props;
    const { amount } = this.state;
    const messages = getTransactionMessages(details)[transactionType] || {};

    const amountNum = toNumber(amount, true);
    const amountCalc = transactionType === 'payment' ? -amountNum : amountNum;
    const color = amountNum > 0 ? (transactionType === 'payment' ? lighten(theme.green, 5) : lighten(theme.red, 5)) : 'inherit';

    const AmountComponent =
      amountNum > 0 ? (
        transactionType === 'payment' ? (
          <span>
            {`- `}
            <Currency quantity={amountNum} />
          </span>
        ) : (
          <span>
            {`+ `}
            <Currency quantity={amountNum} />
          </span>
        )
      ) : (
        <Currency quantity={amountNum} />
      );

    return (
      <ModalWrapper {...props} width={400} locked={true} title={messages.title} valid={amount.length > 0} onClose={this.onClose} modalType="amount">
        <Details>
          <div className="Details__item">
            <div className="Details__item-label">
              <strong>Current Balance</strong>
            </div>
            <div className="Details__item-value">
              <Currency quantity={details.current} />
            </div>
          </div>
          <div
            className="Details__item"
            style={{
              color,
              borderBottom: `1px solid ${theme.B400}`,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            <div className="Details__item-label">
              <strong>{messages.currentType}</strong>
            </div>
            <div className="Details__item-value">{AmountComponent}</div>
          </div>
          <div className="Details__item">
            <div className="Details__item-label">
              <strong>New Balance</strong>
            </div>
            <div className="Details__item-value">
              <Currency quantity={add(details.current, amountCalc)} />
            </div>
          </div>
        </Details>
        <Input label={messages.currentType} name="amount" onChange={this.onChange} type="number" autoFocus value={amount} />
      </ModalWrapper>
    );
  }
}

export default DialogModal;
