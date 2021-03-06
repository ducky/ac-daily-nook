import React from 'react';
import styled from 'styled-components';

import Clock from 'components/Clock';
import Pedia from 'components/Pedia';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

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

const DailyJournalLayout = ({ type }) => {
  return (
    <StyledLayout>
      <div className="Root__header">
        <Header left={<Navigation />} center="Daily Nook" right={<Clock />} />
      </div>
      <div className="Root__body">
        <div className="Root__content">
          <Pedia type={type} />
        </div>
      </div>
      <div className="Root__footer">
        <Footer />
      </div>
    </StyledLayout>
  );
};

export default DailyJournalLayout;
