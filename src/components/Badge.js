import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

const StyledBadge = styled.div`
  display: inline-flex;
  margin: 0 8px;
  padding: 3px 8px;
  background: ${theme.B300};
  color: ${theme.font_primary};
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.accent && `background: ${theme.A500}`};
  ${props => props.accent && `color: ${theme.font_primary}`};

  ${props => props.bug && `background: ${theme.BUG500}`};
  ${props => props.bug && `color: ${theme.font_primary}`};

  ${props => props.fish && `background: ${theme.FISH500}`};
  ${props => props.fish && `color: ${theme.font_primary}`};
`;

const Badge = props => <StyledBadge {...props} />;

export default Badge;
