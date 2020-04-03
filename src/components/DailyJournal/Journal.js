import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import theme from 'styles/theme';
import { IMAGE_NOT_FOUND } from 'constants/strings';

import { actions, selectors } from 'modules/critters';
import { selectors as settingsSelectors } from 'modules/settings';

import Critter from './JournalCritter';

const SECTION_LABELS = {
  ACTIVE: 'Active Now',
  INACTIVE: 'Active Soon / Uncaught',
  CAUGHT: 'Caught Collection',
};

const StyledJournal = styled.div`
  padding: 75px 25px;

  .Section {
    margin: 0 0 150px;

    &:last-child {
      margin: 0;
    }

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

    &__empty {
      display: flex;
      justify-content: center;

      &-container {
        background: ${theme.B600};
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        padding: 25px;
        max-width: 400px;
        width: 100%;
        text-align: center;
      }

      &-image {
        width: 100px;
        height: auto;
        margin: 0 0 10px;
      }

      &-label {
        text-transform: uppercase;
        font-weight: 700;
        color: ${theme.font_secondary};
        font-size: 14px;
      }
    }
  }
`;

const parseCount = arr => {
  return arr.length > 0 ? `(${arr.length})` : '';
};

const Journal = ({ critters, viewMode, onRefresh }) => {
  useEffect(() => {
    const tickInterval = setInterval(onRefresh, 1000 * 15);
    return () => clearInterval(tickInterval);
  }, [onRefresh]);

  const renderSection = (label, list) => {
    const labelFull = `${label} ${parseCount(list)}`;
    return (
      <div className="Section">
        <div className="Section__label">{labelFull}</div>
        {list.length === 0 && (
          <div className="Section__empty">
            <div className="Section__empty-container">
              <img className="Section__empty-image" src={IMAGE_NOT_FOUND} alt="Empty List Nook" />
              <div className="Section__empty-label">We're All Out of Critters Here!</div>
            </div>
          </div>
        )}
        {list.length > 0 && (
          <div className="Section__grid">
            {list.map(data => (
              <Critter key={data.id} {...data} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLists = () => {
    if (viewMode === 'VIEW_ALL') {
      const { listUncaughtActive, listUncaughtInactive, listCaught } = critters;

      return (
        <>
          {renderSection(SECTION_LABELS.ACTIVE, listUncaughtActive)}
          {renderSection(SECTION_LABELS.INACTIVE, listUncaughtInactive)}
          {renderSection(SECTION_LABELS.CAUGHT, listCaught)}
        </>
      );
    }

    if (viewMode === 'VIEW_PROFIT') {
      const { listActive } = critters;
      return renderSection(SECTION_LABELS.ACTIVE, listActive);
    }

    if (viewMode === 'VIEW_UNCAUGHT') {
      const { listUncaughtActive, listUncaughtInactive } = critters;

      return (
        <>
          {renderSection(SECTION_LABELS.ACTIVE, listUncaughtActive)}
          {renderSection(SECTION_LABELS.INACTIVE, listUncaughtInactive)}
        </>
      );
    }

    if (viewMode === 'VIEW_CAUGHT') {
      const { listCaught } = critters;
      return renderSection(SECTION_LABELS.CAUGHT, listCaught);
    }

    return null;
  };

  return <StyledJournal>{renderLists()}</StyledJournal>;
};

const mapState = state => ({
  critters: selectors.critters(state),
  viewMode: settingsSelectors.viewMode(state),
});

const mapDispatch = {
  onRefresh: actions.refreshCritters,
};

export default connect(mapState, mapDispatch)(Journal);
