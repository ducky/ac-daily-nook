import React from 'react';
import styled from 'styled-components';

import Clock from 'components/Clock';
import DailyJournal from 'components/DailyJournal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { SettingsPanel } from 'components/Settings';

const StyledLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;

  .Root__header {
    flex: 0 0 auto;

    &-actions {
      display: flex;

      & > * {
        margin-right: 15px;

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .Root__body {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    min-height: 0;
  }

  .Root__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .Root__footer {
    flex: 0 0 auto;
  }
`;

const DailyJournalLayout = () => {
  return (
    <StyledLayout>
      <div className="Root__header">
        <Header center="Daily Nook" right={<Clock />} />
      </div>
      <div className="Root__body">
        <SettingsPanel />
        <div className="Root__content">
          <DailyJournal />
        </div>
      </div>
      <div className="Root__footer">
        <Footer />
      </div>
    </StyledLayout>
  );
};

export default DailyJournalLayout;
