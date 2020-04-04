import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import theme from 'styles/theme';

const MONTHS = [
  { id: '01', value: 'Jan' },
  { id: '02', value: 'Feb' },
  { id: '03', value: 'Mar' },
  { id: '04', value: 'Apr' },
  { id: '05', value: 'May' },
  { id: '06', value: 'June' },
  { id: '07', value: 'July' },
  { id: '08', value: 'Aug' },
  { id: '09', value: 'Sept' },
  { id: '10', value: 'Oct' },
  { id: '11', value: 'Nov' },
  { id: '12', value: 'Dec' },
];

const StyledMonths = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 3px;
`;

const Month = styled.div`
  font-size: 10px;
  padding: 5px;
  color: ${theme.font_secondary};
  background: ${theme.B400};
  border: 1px solid ${theme.B700};
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 3px;

  ${props => props.current && `border: 2px solid ${theme.font_secondary}`};

  ${props => props.active && `background: ${theme.A500}`};
  ${props => props.active && `border-color: ${theme.A500}`};
  ${props => props.active && `color: ${theme.font_primary}`};
  ${props => props.active && props.current && `border: 2px solid ${theme.font_primary}`};
`;

const PrettyMonths = ({ active }) => {
  const currentMonth = moment().format('MM');

  return (
    <StyledMonths>
      {MONTHS.map(month => (
        <Month key={month.id} active={active.includes(month.id)} current={currentMonth === month.id}>
          {month.value}
        </Month>
      ))}
    </StyledMonths>
  );
};

export default PrettyMonths;
