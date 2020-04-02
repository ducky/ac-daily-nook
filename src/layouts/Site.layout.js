import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

// import theme from '../styles/theme';

// import ModalContainer from '../components/Modal.container';
// import ToastContainer from '../components/Toast.container';
import GlobalStyle from 'styles/global';
import NormalizeStyle from 'styles/normalize';

const StyledLayout = styled.div`
  .Site__content {
    min-height: 100vh;
  }
`;

const SiteLayout = ({ children }) => (
  <StyledLayout>
    <Router>
      <div className="Site__content">{children}</div>
    </Router>
    {/* <ModalContainer /> */}
    {/* <ToastContainer /> */}
    <NormalizeStyle />
    <GlobalStyle />
  </StyledLayout>
);

export default SiteLayout;
