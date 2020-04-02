import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import theme from 'styles/theme';
import { actions, selectors } from 'modules/critters';
import { selectors as settingsSelectors } from 'modules/settings';

import Attribute from 'components/Attribute';
import Badge from 'components/Badge';
import Button from 'components/Button';
import Image from 'components/Image';
import Panel from 'components/Panel';
import PrettyMonths from 'components/PrettyMonthsCompact';

const StyledCritter = styled.div`
  text-align: center;
  border-radius: 5px;
  transition: all 400ms;
  ${props => props.caught && 'opacity: 0.8'};

  &:hover {
    opacity: 1;
  }

  .Critter__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    font-size: 36px;
    font-weight: 700;
    opacity: 0;
    transition: opacity 400ms;
    z-index: 1;
  }

  .Critter__top {
    position: relative;
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

    &:hover .Critter__overlay {
      opacity: 1;
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

  .Critter__stats {
    margin: 0 0 30px;
  }

  .Critter__months {
    margin: 0 0 30px;
  }

  .Critter__action {
    padding: 0 50px;
  }
`;

const Critter = ({
  identifier,
  locationDescription,
  monthsNorthernHemisphere,
  monthsSouthernHemisphere,
  name,
  settings,
  timeActive,
  timeRemaining,
  timeUpcoming,
  timeStart,
  timeEnd,
  type,
  isActive,
  isActiveAlways,
  isCaught,
  isReachingMonthEnd,
  toggleCaught,
}) => {
  const monthsToShow = settings.hemisphere === 'N' ? monthsNorthernHemisphere : monthsSouthernHemisphere;

  const renderTimeRemaining = () => {
    if (isReachingMonthEnd) return `Time Left This Month: ${timeRemaining}`;
    if (isActive && isActiveAlways) return 'Active All Day';
    if (isActive) return `Time Left Today: ${timeRemaining}`;
    return `Time Until Active: ${timeUpcoming}`;
  };

  const renderActiveStatus = () => {
    if (isActiveAlways) return 'Always';
    return `${timeStart} to ${timeEnd}`;
  };

  const onToggleCaught = () => {
    toggleCaught(identifier);
  };

  return (
    <StyledCritter CritterType={type} caught={isCaught}>
      <Panel
        title={
          <div className="Critter__title">
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
        <div className="Critter__top">
          <div className="Critter__top-container">
            <Image className="Critter__image" src={`images/sprites/${identifier}.png`} alt={name} />
          </div>
        </div>
        <div className="Critter__bio">
          <div className="Critter__stats">
            <Attribute label="Hours Active">{renderActiveStatus()}</Attribute>
            {/* <Attribute label="Total Hours Active">{timeActive}</Attribute> */}
            <Attribute label="Location">{locationDescription}</Attribute>
          </div>
          <div className="Critter__months">
            <Attribute label="Months Available" />
            <PrettyMonths active={monthsToShow} />
          </div>
          <div className="Critter__action">
            <Button default={isCaught} onClick={onToggleCaught}>
              {isCaught ? 'UNMARK AS CAUGHT' : 'MARK AS CAUGHT'}
            </Button>
          </div>
        </div>
      </Panel>
    </StyledCritter>
  );
};

const mapState = (state, props) => ({
  isCaught: selectors.isCaught(state, props),
  settings: settingsSelectors.all(state),
});

const mapDispatch = {
  toggleCaught: actions.toggleCaught,
};

export default connect(mapState, mapDispatch)(Critter);
