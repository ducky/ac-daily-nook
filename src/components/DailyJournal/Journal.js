import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/critters';
import { selectors as settingsSelectors } from 'modules/settings';

import Critter from './JournalCritter';

const StyledJournal = styled.div`
  padding: 50px 25px;

  .Section {
    margin: 0 0 150px;

    &:last-child {
      margin: 0;
    }

    &__label {
      font-size: 24px;
      font-weight: 700;
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

const Journal = ({ critters, viewMode, onRefresh }) => {
  const { listUncaughtActive, listUncaughtInactive, listCaught } = critters;

  useEffect(() => {
    const tickInterval = setInterval(onRefresh, 1000 * 15);
    return () => clearInterval(tickInterval);
  }, [onRefresh]);

  return (
    <StyledJournal>
      {['VIEW_PROGRESS', 'VIEW_UNCAUGHT', 'VIEW_ALL'].includes(viewMode) && (
        <div className="Section">
          <div className="Section__label">Active Now</div>
          <div className="Section__grid">
            {listUncaughtActive.map(data => (
              <Critter key={data.identifier} {...data} />
            ))}
          </div>
        </div>
      )}
      {['VIEW_UNCAUGHT', 'VIEW_ALL'].includes(viewMode) && (
        <div className="Section">
          <div className="Section__label">Active Soon / Uncaught</div>
          <div className="Section__grid">
            {listUncaughtInactive.map(data => (
              <Critter key={data.identifier} {...data} />
            ))}
          </div>
        </div>
      )}
      {['VIEW_CAUGHT', 'VIEW_ALL'].includes(viewMode) && (
        <div className="Section">
          <div className="Section__label">Caught Collection</div>
          <div className="Section__grid">
            {listCaught.map(data => (
              <Critter key={data.identifier} {...data} />
            ))}
          </div>
        </div>
      )}
    </StyledJournal>
  );
};

const mapState = state => ({
  critters: selectors.critters(state),
  viewMode: settingsSelectors.viewMode(state),
});

const mapDispatch = {
  onRefresh: actions.refreshCritters,
};

export default connect(mapState, mapDispatch)(Journal);
