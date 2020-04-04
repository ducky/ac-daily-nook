import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import theme from 'styles/theme';

const StyledNavigation = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;

  a {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    padding: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    color: ${theme.font_primary};
    cursor: pointer;
    text-decoration: none;
    transition: background 300ms, color 300ms;

    &:hover {
      background: ${theme.B800};
      color: ${theme.A500};
      text-decoration: none;
    }
  }

  a.active {
    color: ${theme.A500};
  }
`;

const Navigation = () => (
  <StyledNavigation>
    <NavLink to="/" exact>
      Catch Mode
    </NavLink>
    <NavLink to="/bugs">Bugs</NavLink>
    <NavLink to="/fish">Fish</NavLink>
  </StyledNavigation>
);

export default Navigation;
