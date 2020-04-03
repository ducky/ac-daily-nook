import React from 'react';
import styled from 'styled-components';

const StyledAttribute = styled.div`
  display: flex;
  margin: 0 0 8px;

  &:last-child {
    margin: 0;
  }

  .Attribute__label {
    font-weight: 700;
    margin-right: 5px;
  }

  .Attribute__value {
  }
`;

const Attribute = ({ label, children }) => (
  <StyledAttribute>
    {label && <div className="Attribute__label">{children ? `${label}:` : label}</div>}
    {children && <div className="Attribute__value">{children}</div>}
  </StyledAttribute>
);

export default Attribute;
