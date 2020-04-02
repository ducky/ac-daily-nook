import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import theme from 'styles/theme';

const MONTHS = [
  { id: '01', value: 'J', title: 'January' },
  { id: '02', value: 'F', title: 'February' },
  { id: '03', value: 'M', title: 'March' },
  { id: '04', value: 'A', title: 'April' },
  { id: '05', value: 'M', title: 'May' },
  { id: '06', value: 'J', title: 'June' },
  { id: '07', value: 'J', title: 'July' },
  { id: '08', value: 'A', title: 'August' },
  { id: '09', value: 'S', title: 'September' },
  { id: '10', value: 'O', title: 'October' },
  { id: '11', value: 'N', title: 'November' },
  { id: '12', value: 'D', title: 'December' },
];

const StyledMonths = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
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
        <Month
          key={month.id}
          active={active.includes(month.id)}
          current={currentMonth === month.id}
          title={month.title}
        >
          {month.value}
        </Month>
      ))}
    </StyledMonths>
  );
};

export default PrettyMonths;
