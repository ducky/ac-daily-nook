import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isNaN from 'lodash/isNaN';
import noop from 'lodash/noop';

import { actions } from 'modules/toast';

import theme from 'styles/theme';

import Button from 'components/Button';

const DEFAULT_TIMEOUT = 4000;

const Toast = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 0;
  background: ${theme.B400};
  color: ${theme.font_primary};
  border-top: 3px solid ${theme.A500};
  border-radius: 5px;
  padding: 15px;
  margin: 0 0 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  pointer-events: auto;
  transition: transform 300ms;

  ${props => props.type === 'alert' && `border-top: 10px solid ${theme.red}`};

  &:last-child {
    margin: 0;
  }

  &.toast-enter {
    opacity: 0;
    transform: translateY(-100%);
  }

  &.toast-enter.toast-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: transform ${props => props.transitionEnter}, opacity ${props => props.transitionEnter};
  }

  &.toast-leave {
    opacity: 1;
    transform: translateY(0);
  }

  &.toast-leave.toast-leave-active {
    opacity: 0;
    transform: translateY(-100%);
    transition: transform ${props => props.transitionLeave}, opacity ${props => props.transitionLeave};
  }

  .Toast__body {
    margin-right: 25px;
  }

  .Toast__header {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 5px;
  }

  .Toast__content {
    font-size: 14px;
    font-weight: 400;

    p {
      margin: 0 0 15px;

      &:last-child {
        margin: 0;
      }
    }
  }

  .Toast__actions {
    margin-left: auto;
  }
`;

class ToastWrapper extends PureComponent {
  static propTypes = {
    actions: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),

    // Methods
    close: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    type: 'info',
    timeout: DEFAULT_TIMEOUT,
    actions: [],

    // Methods
    close: noop,
    onClose: noop,
  };

  state = { disabled: false };

  startTimer = () => {
    const { onClose, timeout } = this.props;

    if (timeout !== false) {
      const parseTimeout = parseInt(timeout, 10);
      const computedTimeout = !isNaN(parseTimeout) ? parseTimeout : DEFAULT_TIMEOUT;
      this.timer = setTimeout(this.withClose(onClose), computedTimeout);
    }
  };

  stopTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  withAction = (action = noop) => () => {
    const { id, close } = this.props;
    this.setState(state => ({ ...state, disabled: true }));
    action();
    close(id);
  };

  withClose = (action = noop) => () => {
    const { id, close } = this.props;

    action();
    close(id);
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const { actions, children, theme, title, type, transitionEnter, transitionLeave } = this.props;
    const { disabled } = this.state;

    const renderActions = () => {
      if (!actions.length) return null;
      return actions.map((action, i) => (
        <Button
          key={`${i}_${action.text}`}
          className="Toast__action"
          disabled={disabled}
          onClick={this.withAction(action.action)}
        >
          {action.text}
        </Button>
      ));
    };

    return (
      <Toast
        type={type}
        theme={theme}
        onMouseEnter={this.stopTimer}
        onMouseLeave={this.startTimer}
        transitionEnter={transitionEnter}
        transitionLeave={transitionLeave}
      >
        <div className="Toast__body">
          <div className="Toast__header">{title}</div>
          <div className="Toast__content">{children}</div>
        </div>
        <div className="Toast__actions">{renderActions()}</div>
      </Toast>
    );
  }
}

export default connect(null, { close: actions.closeToast })(ToastWrapper);
