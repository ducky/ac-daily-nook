import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noop from 'lodash/noop';

import theme from 'styles/theme';

const StyledButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${theme.A500};
  border-radius: 3px;
  font-size: 14px;
  padding: 10px 15px;
  opacity: 0.9;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  color: ${theme.font_primary};
  transition: all 200ms ${theme.TRANSITION_TIMING_FUNCTION};

  ${props => props.inline && `display: inline-flex`};
  ${props => props.inline && `width: auto`};

  ${props => props.default && `background: rgba(255, 255, 255, .2)`};

  ${props => props.dark && `background: rgba(0, 0, 0, 0.2)`};
  ${props => props.dark && `border: 1px solid rgba(0, 0, 0, 0.2)`};

  ${props => props.square && `padding: 15px`};

  ${props => props.transparent && `background: transparent`};

  ${props => props.iconOnly && `padding: 10px 15px`};
  ${props => props.iconOnly && `font-size: 16px`};

  &:not([disabled]):hover {
    opacity: 1;
  }

  &:not([disabled]):active {
    transform: scale(0.95);
  }

  :focus {
    box-shadow: 0 0 5px ${theme.A500};
    ${props => props.default && `box-shadow: 0 0 5px rgba(0,0,0, .2)`};
  }

  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .Button__icon {
    margin-right: 8px;

    &:last-child {
      margin: 0;
    }
  }
`;

const Button = ({ children, icon, disabled, onClick, ...rest }) => {
  const iconOnly = icon && !!children;
  return (
    <StyledButton iconOnly={iconOnly} disabled={disabled} onClick={disabled ? noop : onClick} {...rest}>
      {icon && <FontAwesomeIcon className="Button__icon" icon={icon} />}
      {!iconOnly && <div className="Button__content">{children}</div>}
    </StyledButton>
  );
};

export default Button;
