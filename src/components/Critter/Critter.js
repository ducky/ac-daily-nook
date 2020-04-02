import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

import Attribute from 'components/Attribute';
import Badge from 'components/Badge';
import Image from 'components/Image';
import LiveIndicator from 'components/LiveIndicator';
import Panel from 'components/Panel';
import PrettyMonths from 'components/PrettyMonths';

const StyledCritter = styled.div`
  position: relative;
  text-align: center;
  border-radius: 5px;
  /* overflow: hidden;
  cursor: pointer; */

  .Critter__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    font-size: 36px;
    font-weight: 700;
    opacity: 0;
    transition: opacity 600ms;
    z-index: 1;
  }

  &:hover .Critter__overlay {
    opacity: 1;
  }

  .Critter__top {
    height: 150px;
    margin: 0 0 15px;

    &-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      width: 100%;
      height: 100%;
      background: ${theme.B600};
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      overflow: hidden;
    }
  }

  .Critter__image {
    height: 125px;
    width: auto;
    max-width: 100%;
  }

  .Critter__bio {
  }

  .Critter__title {
    display: flex;
    align-items: center;

    &--title {
      text-align: left;
    }

    &--name {
      font-size: 18px;
      font-weight: 700;
    }

    &--time {
      font-size: 10px;
      color: ${theme.font_secondary};
    }

    &--indicator {
      margin-right: 10px;
    }
  }

  .Critter__label {
    font-weight: 700;
    margin: 0 0 8px;
  }

  .Critter__hemispheres {
    margin-top: 25px;
  }

  .Critter__months {
    margin: 0 0 20px;

    &:last-child {
      margin: 0;
    }
  }
`;

const Critter = ({
  identifier,
  locationDescription,
  monthsNorthernHemisphere,
  monthsSouthernHemisphere,
  name,
  timeRemaining,
  timeUpcoming,
  timeStart,
  timeEnd,
  type,
  isActive,
  isActiveAlways,
}) => {
  const renderTimeRemaining = () => {
    if (isActiveAlways) return 'Always Active';
    if (isActive) return `Time Left Today: ${timeRemaining}`;
    return `Time Until Active: ${timeUpcoming}`;
  };

  const renderActiveStatus = () => {
    if (isActiveAlways) return 'Always';
    return `${timeStart} to ${timeEnd}`;
  };

  return (
    <StyledCritter CritterType={type}>
      <Panel
        title={
          <div className="Critter__title">
            <div className="Critter__title--indicator">
              <LiveIndicator active={isActive} />
            </div>
            <div className="Critter__title--title">
              <div className="Critter__title--name">{name}</div>
              <div className="Critter__title--time">{renderTimeRemaining()}</div>
            </div>
          </div>
        }
        addon={
          <Badge bug={type === 'BUG'} fish={type === 'FISH'}>
            {type}
          </Badge>
        }
      >
        {/* <div className="Critter__overlay">YES! Caught One!</div> */}
        <div className="Critter__top">
          <div className="Critter__top-container">
            <Image className="Critter__image" src={`images/sprites/${identifier}.png`} alt={name} />
          </div>
        </div>
        <div className="Critter__bio">
          <Attribute label="Hours Active">{renderActiveStatus()}</Attribute>
          <Attribute label="Location">{locationDescription}</Attribute>
          <div className="Critter__hemispheres">
            <div className="Critter__months">
              <div className="Critter__label">Northern Hemisphere</div>
              <PrettyMonths active={monthsNorthernHemisphere} />
            </div>
            <div className="Critter__months">
              <div className="Critter__label">Southern Hemisphere</div>
              <PrettyMonths active={monthsSouthernHemisphere} />
            </div>
          </div>
        </div>
      </Panel>
    </StyledCritter>
  );
};

export default Critter;
