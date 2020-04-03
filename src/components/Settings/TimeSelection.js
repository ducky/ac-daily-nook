import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/settings';

import Select from 'components/Select';

const StyledSetting = styled.div``;

const TimeSelection = ({ value, onToggleSetting }) => {
  const VIEW_OPTIONS = [
    { label: '12-Hour', value: '12' },
    { label: '24-Hour', value: '24' },
  ];

  const onChange = (key, value) => {
    onToggleSetting({ key, value });
  };

  return (
    <StyledSetting>
      <Select label="Time Format" name="formatTime" options={VIEW_OPTIONS} onChange={onChange} value={value} />
    </StyledSetting>
  );
};

const mapState = state => ({
  value: selectors.formatTime(state),
});

const mapDispatch = {
  onToggleSetting: actions.toggleSetting,
};

export default connect(mapState, mapDispatch)(TimeSelection);
