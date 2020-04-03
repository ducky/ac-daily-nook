import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { selectors as settingsSelectors } from 'modules/settings';

const StyledClock = styled.div`
  font-size: 20px;
`;

const Clock = ({ settings }) => {
  const formatTime = settings.formatTime === '12' ? 'hh:mm:ss A' : 'HH:mm:ss';
  const [time, setTime] = useState(moment().format(formatTime));

  const onTick = useCallback(() => {
    const time = moment().format(formatTime);
    setTime(time);
  }, [formatTime]);

  useEffect(() => {
    const tickInterval = setInterval(onTick, 200);
    return () => clearInterval(tickInterval);
  }, [onTick]);

  return (
    <StyledClock>
      <div className="Clock__time">{time}</div>
    </StyledClock>
  );
};

const mapState = state => ({
  settings: settingsSelectors.all(state),
});

export default connect(mapState)(Clock);
