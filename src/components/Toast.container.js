import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectors } from 'modules/toast';

import { stripTransition, TRANSITION_FAST, TRANSITION_MEDIUM } from 'styles/theme';
import AlertToast from './Toasts/AlertToast';
import SuccessToast from './Toasts/SuccessToast';

const types = {
  alert: <AlertToast />,
  success: <SuccessToast />,
};

const ToastContainer = styled.div`
  position: fixed;
  top: 75px;
  left: 25px;
  right: 25px;
  z-index: 8;
  pointer-events: none;

  > span {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
  }
`;

const ToastConductor = ({ toasts = [] }) => {
  const getToastComponent = type => types[type] || null;

  return (
    <ToastContainer>
      <ReactCSSTransitionGroup
        transitionName="toast"
        transitionEnterTimeout={stripTransition(TRANSITION_MEDIUM)}
        transitionLeaveTimeout={stripTransition(TRANSITION_FAST)}
      >
        {toasts.map(toast => {
          const Toast = getToastComponent(toast.type);

          return Toast
            ? React.cloneElement(Toast, {
                key: toast.id,
                id: toast.id,
                transitionEnter: TRANSITION_MEDIUM,
                transitionLeave: TRANSITION_FAST,
                ...toast.options,
              })
            : null;
        })}
      </ReactCSSTransitionGroup>
    </ToastContainer>
  );
};

const stateToProps = state => ({
  toasts: selectors.toasts(state),
});

export default connect(stateToProps)(ToastConductor);
