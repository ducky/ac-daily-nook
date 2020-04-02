import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

const StyledIndicator = styled.div`
  position: relative;

  .Indicator__circle {
    width: 15px;
    height: 15px;
    background-color: ${theme.red};
    opacity: 0.4;
    border-radius: 50%;
    transition: all 300ms;

    ${props => props.active && 'opacity: 1'};
  }

  .Indicator__ring {
    position: absolute;
    border: 3px solid ${theme.red};
    border-radius: 999px;
    height: 25px;
    width: 25px;
    top: -5px;
    left: -5px;

    opacity: 0;

    ${props => props.active && 'animation: pulsate 1s ease-out infinite;'};
  }

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }
`;

const Badge = ({ active }) => (
  <StyledIndicator active={active}>
    <div className="Indicator__ring"></div>
    <div className="Indicator__circle"></div>
  </StyledIndicator>
);

export default Badge;
