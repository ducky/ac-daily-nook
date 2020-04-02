import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import parseCritters from 'utils/parseCritters';

import Critter from './Critter';

const StyledGrid = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 15px;
`;

const CritterGrid = ({ data }) => {
  const [critters, setCritters] = useState(parseCritters(data));

  const onTick = useCallback(() => {
    const parsed = parseCritters(data);
    setCritters(parsed);
  }, [data]);

  useEffect(() => {
    const tickInterval = setInterval(onTick, 1000 * 30);
    return () => clearInterval(tickInterval);
  }, [onTick]);

  return (
    <StyledGrid>
      {critters.map(({ id, ...data }) => (
        <Critter key={id} {...data} />
      ))}
    </StyledGrid>
  );
};

export default CritterGrid;
