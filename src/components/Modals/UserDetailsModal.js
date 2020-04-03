import React, { useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { sanitizeUrl } from '@braintree/sanitize-url';

import { DEFAULT_COORD, DEFAULT_ZOOM } from '../../constants/defaults';
import useDragZoom from '../../hooks/useDragZoom';
import useInput from '../../hooks/useInput';
import { selectors as refSelectors } from '../../modules/ref';
import { selectors } from '../../modules/user';

import Columns from '../Columns';
import FormSection from '../FormSection';
import ModalWrapper from './ModalWrapper';
import BoardCard from '../Board/BoardCard';
import Note from '../Note';
import Input from '../Input';
import Select from '../Select';
import Tags from '../Tags';

const COLOR_COUNT = 162;

const CardThemeArea = styled.div`
  display: flex;

  .CardTheme__input {
    flex: 1 1 auto;
    margin-right: 25px;
  }

  .CardTheme__card {
    flex: 0 0 auto;
    width: 200px;

    &-ele {
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    }
  }
`;

const UserDetailsModal = ({ cardThemes, user, onClose, ...props }) => {
  const cardTheme = useInput(user.cardTheme);
  const cardThemeCustom = useInput(user.cardThemeCustom);
  const color = useInput(user.color);
  const username = useInput(user.username, value => !!value);

  const cardEl = useRef();
  const cardPosition = useDragZoom({
    ref: cardEl,
    enabled: cardTheme.value === 'Custom',
    x: user.cardX || DEFAULT_COORD,
    y: user.cardY || DEFAULT_COORD,
    zoom: user.cardZoom || DEFAULT_ZOOM,
  });

  const cardThemeOptions = [...Object.keys(cardThemes), 'Custom'];
  const customUrl = sanitizeUrl(cardThemeCustom.value);
  const hasSelectedCustom = cardTheme.value === 'Custom';
  const selectedTheme = !hasSelectedCustom ? cardThemes[cardTheme.value] : customUrl;

  const onCloseModal = () => {
    onClose({
      ...user,
      cardTheme: cardTheme.value,
      cardThemeCustom: cardThemeCustom.value,
      cardX: cardPosition.x,
      cardY: cardPosition.y,
      cardZoom: cardPosition.zoom,
      color: color.value,
      username: username.value,
    });
  };

  return (
    <ModalWrapper {...props} title="Profile Editor" closeText="Save Details" onClose={onCloseModal} width={600} locked={true} valid={!username.invalid}>
      <FormSection title="User Details">
        <Input title="Username" maxLength="15" autoFocus {...username} />
        <Tags title="Color" count={COLOR_COUNT} {...color} />
      </FormSection>
      <FormSection title="Card Details">
        <CardThemeArea>
          <div className="CardTheme__input">
            <Select title="Card Theme" options={cardThemeOptions} {...cardTheme} />
            {cardTheme.value === 'Custom' && (
              <>
                <Input title="Custom Card Theme URL" {...cardThemeCustom} />
                <Columns span="3">
                  <Input title="X Offset" {...cardPosition.updater.x} />
                  <Input title="Y Offset" {...cardPosition.updater.y} />
                  <Input title="Zoom" {...cardPosition.updater.zoom} />
                </Columns>
                <Note style={{ marginTop: -15 }}>
                  <strong>Tip: </strong> You can drag and scroll on the card to pan/zoom, or use your up/down arrow keys in the boxes.
                </Note>
              </>
            )}
          </div>
          <div className="CardTheme__card">
            <div ref={cardEl}>
              <BoardCard className="CardTheme__card-ele" cardTheme={selectedTheme} cardPosition={cardPosition} useCustomValues={hasSelectedCustom} />
            </div>
          </div>
        </CardThemeArea>
      </FormSection>
    </ModalWrapper>
  );
};

const mapState = state => ({
  cardThemes: refSelectors.cardThemes(state),
  user: selectors.details(state),
});

export default connect(mapState)(UserDetailsModal);
