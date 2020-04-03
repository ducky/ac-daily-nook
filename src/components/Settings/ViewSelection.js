import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/settings';

import Select from 'components/Select';

const StyledSetting = styled.div``;

const ViewSelection = ({ value, onToggleSetting }) => {
  const VIEW_OPTIONS = [
    { label: 'View All', value: 'VIEW_ALL' },
    { label: 'Museum Mode (Uncaught by Urgency)', value: 'VIEW_UNCAUGHT' },
    { label: 'Profit Mode (Active by Price)', value: 'VIEW_PROFIT' },
    { label: 'Collection Mode (Only Caught)', value: 'VIEW_CAUGHT' },
  ];

  const onChange = (key, value) => {
    onToggleSetting({ key, value });
  };

  return (
    <StyledSetting>
      <Select label="View Mode" name="viewMode" options={VIEW_OPTIONS} onChange={onChange} value={value} />
    </StyledSetting>
  );
};

const mapState = state => ({
  value: selectors.viewMode(state),
});

const mapDispatch = {
  onToggleSetting: actions.toggleSetting,
};

export default connect(mapState, mapDispatch)(ViewSelection);
