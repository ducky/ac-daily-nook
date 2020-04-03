import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

const StyledHeader = styled.header`
  display: grid;
  position: relative;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  background: ${theme.B700};
  height: 50px;
  padding: 8px 25px;
  font-weight: 700;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  z-index: 9;

  .Header__center {
    font-size: 26px;
    pointer-events: none;
    text-align: center;
    margin: 0 10px;
  }

  .Header__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .Header__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const Header = ({ left, center, right }) => (
  <StyledHeader>
    <div className="Header__left">{left}</div>
    <div className="Header__center">{center}</div>
    <div className="Header__right">{right}</div>
  </StyledHeader>
);

export default Header;
