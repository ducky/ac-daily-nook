import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';
import Label from 'components/Label';

const StyledSelect = styled.select`
  -webkit-appearance: none;
  width: 100%;
  font-size: 14px;
  padding: 10px 15px;
  background: ${theme.B400};
  border: 1px solid ${theme.B600};
  border-radius: 3px;
  box-shadow: none;
  color: ${theme.font_primary};
  outline: none;
  transition: background 300ms, border-color 300ms, padding 300ms;

  option {
    background: ${theme.B500};
    color: ${theme.font_primary};
  }

  &:disabled {
    background: transparent;
    border-color: transparent;
    padding: 0;
  }
`;

const Select = ({ label, options, style, onChange, ...props }) => {
  const onSelectChange = e => {
    const { name = '', value } = e.target;
    onChange(name, value);
  };

  return (
    <div style={style}>
      {label && <Label>{label}</Label>}
      <StyledSelect onChange={onSelectChange} {...props}>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

export default Select;
