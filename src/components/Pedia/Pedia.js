import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectors } from 'modules/critters';

import theme from 'styles/theme';

import Critter from './PediaCritter';

const StyledPedia = styled.div`
  padding: 45px 25px;

  .Section {
    &__label {
      font-size: 20px;
      font-weight: 700;
      color: ${theme.font_secondary};
      text-shadow: 0 1px 5px ${theme.B900};
      text-align: center;
      margin: 0 0 25px;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      grid-gap: 15px;
    }
  }
`;

const Pedia = ({ critters, type }) => {
  return (
    <StyledPedia>
      <div className="Section">
        <div className="Section__label">
          {type.toUpperCase()} SHOWCASE ({critters.length})
        </div>
        <div className="Section__grid">
          {critters.map(data => (
            <Critter key={data.id} {...data} />
          ))}
        </div>
      </div>
    </StyledPedia>
  );
};

const mapState = (state, { type }) => ({
  critters: selectors.crittersByType(state, type),
});

export default connect(mapState)(Pedia);
