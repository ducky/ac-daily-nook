import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/settings';

import Select from 'components/Select';

const StyledSetting = styled.div``;

const DateSelection = ({ value, onToggleSetting }) => {
  const VIEW_OPTIONS = [
    { label: 'All Months', value: 'ALL' },
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const onChange = (key, value) => {
    onToggleSetting({ key, value });
  };

  return (
    <StyledSetting>
      <Select label="Month" name="month" options={VIEW_OPTIONS} onChange={onChange} value={value} />
    </StyledSetting>
  );
};

const mapState = state => ({
  value: selectors.month(state),
});

const mapDispatch = {
  onToggleSetting: actions.toggleSetting,
};

export default connect(mapState, mapDispatch)(DateSelection);
