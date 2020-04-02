import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';

import theme from 'styles/theme';

const StyledToggle = styled.label`
  position: relative;
  width: 60px;
  cursor: pointer;

  .Toggle__checkbox {
    display: none;
  }

  .Toggle__track {
    display: flex;
    height: 30px;
    padding: 0;
    border-radius: 30px;
    background-color: ${theme.B500};
    border: 2px solid ${theme.B400};
    transition: background-color 300ms ease-in;
  }

  .Toggle__knob {
    display: flex;
    height: 30px;
    width: 30px;
    margin-top: -2px;
    background: ${theme.font_primary};
    border: 2px solid ${theme.B400};
    border-radius: 30px;
    transition: all 300ms ease-in 0s;
  }

  .Toggle__checkbox:checked + .Toggle__track {
    background-color: ${theme.A500};
    border-color: ${theme.A500};
  }

  .Toggle__checkbox:checked + .Toggle__track .Toggle__knob {
    border-color: ${theme.A500};
  }

  .Toggle__checkbox:checked + .Toggle__track .Toggle__knob {
    transform: translateX(30px);
  }
`;

const Toggle = ({ disabled, name, value, onChange = noop, ...rest }) => {
  const onToggle = e => {
    const { name = '', checked } = e.target;
    onChange(name, checked);
  };

  return (
    <StyledToggle {...rest}>
      <input
        className="Toggle__checkbox"
        name={name}
        onClick={disabled ? noop : onToggle}
        checked={value}
        type="checkbox"
      />
      <div className="Toggle__track">
        <div className="Toggle__knob"></div>
      </div>
    </StyledToggle>
  );
};

export default Toggle;
