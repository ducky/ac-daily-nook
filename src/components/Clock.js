import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledClock = styled.div`
  font-size: 20px;
`;

const Clock = () => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));

  const onTick = useCallback(() => {
    const time = moment().format('HH:mm:ss');
    setTime(time);
  }, []);

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

export default Clock;
