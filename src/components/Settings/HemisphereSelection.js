import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/settings';

import Select from 'components/Select';

const StyledSetting = styled.div``;

const ViewSelection = ({ value, onToggleSetting }) => {
  const VIEW_OPTIONS = [
    { label: 'Northern', value: 'N' },
    { label: 'Southern', value: 'S' },
  ];

  const onChange = (key, value) => {
    onToggleSetting({ key, value });
  };

  return (
    <StyledSetting>
      <Select label="Hemisphere" name="hemisphere" options={VIEW_OPTIONS} onChange={onChange} value={value} />
    </StyledSetting>
  );
};

const mapState = state => ({
  value: selectors.hemisphere(state),
});

const mapDispatch = {
  onToggleSetting: actions.toggleSetting,
};

export default connect(mapState, mapDispatch)(ViewSelection);
