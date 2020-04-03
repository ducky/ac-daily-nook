import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import theme from 'styles/theme';

import { DateSelection, HemisphereSelection, TimeSelection, TypeSelection, ViewSelection } from 'components/Settings';

const StyledPanel = styled.div`
  position: fixed;
  top: 75px;
  left: -325px;
  z-index: 8;
  transition: transform 400ms;

  ${props => props.visible && 'transform: translateX(100%)'};

  .Panel__container {
    width: 326px;
    background: ${theme.B700};
    border: 1px solid ${theme.B800};
    padding: 15px 20px 20px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    border-bottom-right-radius: 5px;
  }

  .Panel__knob {
    position: absolute;
    top: 0;
    left: 325px;
    padding: 10px 15px;
    background: ${theme.B700};
    color: ${theme.A500};
    border: 1px solid ${theme.B800};
    border-left: none;
    border-radius: 0 5px 5px 0;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    font-size: 25px;
    cursor: pointer;
  }

  .Panel__label {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 20px;
  }

  .Panel__section {
    margin: 0 0 35px;

    &:last-child {
      margin: 0;
    }
  }

  .Setting__item {
    margin: 0 0 15px;

    &:last-child {
      margin: 0;
    }
  }
`;

const SettingsPanel = () => {
  const [visible, setVisible] = useState(false);

  const onToggleVisible = () => {
    setVisible(v => !v);
  };

  return (
    <StyledPanel visible={visible}>
      <div className="Panel__container">
        <div className="Panel__section">
          <div className="Panel__label">Filters</div>
          <div className="Setting__item">
            <ViewSelection />
          </div>
          <div className="Setting__item">
            <TypeSelection />
          </div>
          <div className="Setting__item">
            <DateSelection />
          </div>
          <div className="Setting__item">
            <HemisphereSelection />
          </div>
        </div>
        <div className="Panel__section">
          <div className="Panel__label">Settings</div>
          <div className="Setting__item">
            <TimeSelection />
          </div>
        </div>
      </div>
      <div className="Panel__knob" onClick={onToggleVisible}>
        <FontAwesomeIcon icon="cog" />
      </div>
    </StyledPanel>
  );
};

export default SettingsPanel;
