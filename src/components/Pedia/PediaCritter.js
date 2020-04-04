import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

import Attribute from 'components/Attribute';
import Badge from 'components/Badge';
import Image from 'components/Image';
import Panel from 'components/Panel';
import PrettyMonths from 'components/PrettyMonths';

const StyledCritter = styled.div`
  text-align: center;
  border-radius: 5px;

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
  shadowSize,
  timeStart,
  timeEnd,
  type,
  isActiveAlways,
}) => {
  const renderActiveStatus = () => {
    if (isActiveAlways) return 'Always';
    return `${timeStart} to ${timeEnd}`;
  };

  return (
    <StyledCritter>
      <Panel
        title={
          <div className="Critter__title">
            <div className="Critter__title--title">
              <div className="Critter__title--name">{name}</div>
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
            <Attribute label="Northern Hemisphere" />
            <PrettyMonths active={monthsNorthernHemisphere} />
          </div>
          <div className="Critter__months">
            <Attribute label="Southern Hemisphere" />
            <PrettyMonths active={monthsSouthernHemisphere} />
          </div>
        </div>
      </Panel>
    </StyledCritter>
  );
};

export default Critter;
