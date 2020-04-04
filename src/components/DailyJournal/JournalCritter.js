import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import theme from 'styles/theme';
import { actions, selectors } from 'modules/critters';
import { selectors as settingsSelectors } from 'modules/settings';
import { actions as toastActions } from 'modules/toast';

import Attribute from 'components/Attribute';
import Badge from 'components/Badge';
import Button from 'components/Button';
import Image from 'components/Image';
import Panel from 'components/Panel';
import PrettyMonths from 'components/PrettyMonthsCompact';

const StyledCritter = styled.div`
  text-align: center;
  border-radius: 5px;
  border-top: 2px solid ${theme.invalid};
  ${props => props.isCaught && `border-top-color: ${theme.A500}`};

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
    height: 100px;
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
    height: 50px;
    width: auto;
    max-width: 100%;
  }

  .Critter__bio {
  }

  .Critter__title {
    display: flex;
    align-items: center;

    &--indicator {
      margin-right: 10px;
    }

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
  }

  .Critter__label {
    font-weight: 700;
    margin: 0 0 8px;
  }

  .Critter__stats {
    font-size: 15px;
    margin: 0 0 20px;
  }

  .Critter__months {
    margin: 0 0 20px;
  }

  .Critter__action {
    padding: 0 50px;
  }
`;

const Critter = ({
  id,
  locationDescription,
  monthsNorthernHemisphere,
  monthsSouthernHemisphere,
  name,
  sellPrice,
  settings,
  shadowSize,
  timeRemaining,
  timeUpcoming,
  timeStart,
  timeEnd,
  type,
  isActive,
  isActiveAlways,
  isCaught,
  isReachingMonthEnd,
  createToast,
  onToggleCaught,
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

  const onCaught = () => {
    onToggleCaught(id);
    const title = isCaught ? 'Marked as Uncaught' : 'Marked as Caught';
    const message = isCaught ? (
      <p>
        Whoops! <strong style={{ color: theme.A500 }}>{name}</strong> set back to uncaught status.
      </p>
    ) : (
      <p>
        Congrats on catching a beautiful <strong style={{ color: theme.A500 }}>{name}</strong>!
      </p>
    );
    createToast('success', {
      title,
      message,
      actions: [{ text: 'Undo', action: () => onToggleCaught(id) }],
    });
  };

  return (
    <StyledCritter isCaught={isCaught}>
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
            <Image className="Critter__image" src={`images/sprites/${id}.png`} alt={name} />
          </div>
        </div>
        <div className="Critter__bio">
          <div className="Critter__stats">
            <Attribute label="Hours Active">{renderActiveStatus()}</Attribute>
            <Attribute label="Location">{locationDescription}</Attribute>
            {type === 'FISH' && <Attribute label="Shadow Size">{shadowSize}</Attribute>}
            <Attribute label="Bell Price">{sellPrice > 0 ? sellPrice : 'N/A'}</Attribute>
            {type === 'BUG' && <Attribute>&nbsp;</Attribute>}
          </div>
          <div className="Critter__months">
            <Attribute label="Months Available" />
            <PrettyMonths active={monthsToShow} />
          </div>
          <div className="Critter__action">
            <Button default={isCaught} onClick={onCaught}>
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
  createToast: toastActions.createToast,
  onToggleCaught: actions.toggleCaught,
};

export default connect(mapState, mapDispatch)(Critter);
