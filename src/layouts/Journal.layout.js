import React from 'react';
import styled from 'styled-components';

import DATA from 'data/db.json';

// import theme from 'styles/theme';

import Clock from 'components/Clock';
import CritterGrid from 'components/Critter';
import Header from 'components/Header';

const StyledLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;

  .Root__header {
    flex: 0 0 auto;
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
`;

const HomeLayout = () => {
  return (
    <StyledLayout>
      <div className="Root__header">
        <Header left={<Clock />} center="Daily Nook" right="Actions" />
      </div>
      <div className="Root__body">
        <div className="Root__content">
          <CritterGrid data={DATA} />
        </div>
      </div>
    </StyledLayout>
  );
};

export default HomeLayout;
