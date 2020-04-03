import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import theme from 'styles/theme';

const StyledIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${theme.invalid};
  border-radius: 999px;
  font-size: 12px;

  ${props => props.active && `background: ${theme.A500}`};
`;

const CaughtIndicator = ({ active }) => (
  <StyledIndicator active={active}>
    <FontAwesomeIcon icon={active ? 'check' : 'times'} />
  </StyledIndicator>
);

export default CaughtIndicator;
