import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledFooter = styled.div`
  display: flex;
  position: relative;
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;

  .Footer__left {
    margin-right: 15px;
  }

  .Footer__right {
    margin-left: auto;
  }

  .emoji {
    display: inline-block;
    font-size: 10px;
    margin: 0 5px;
    color: #c34968;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <div className="Footer__left">Disclaimer - Animal Crossing & Critters are all property of Nintendo</div>
    <div className="Footer__right">
      Made with
      <FontAwesomeIcon className="emoji" icon="heart" />
      by{' '}
      <a href="https://christieman.com" target="_blank" rel="noopener noreferrer">
        Ducky
      </a>
      {'  -  '}
      <a href="https://www.paypal.me/datducky" target="_blank" rel="noopener noreferrer">
        Donate
      </a>
    </div>
  </StyledFooter>
);

export default Footer;
