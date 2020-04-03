import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import USER_ROLES from '../../constants/userRoles';
import hasRoles from '../../utils/hasRoles';

import cardDecks from '../../constants/decks';
import useInput from '../../hooks/useInput';
import { actions, selectors } from '../../modules/base';
import { selectors as userSelectors } from '../../modules/user';

import FormSection from '../FormSection';
import ModalWrapper from './ModalWrapper';
import Checkbox from '../Checkbox';
import Input from '../Input';
import Note from '../Note';
import Select from '../Select';
import Table from '../Table';

const cardDeckOptions = [...Object.keys(cardDecks), 'Custom'];

const RoomSettingsModal = ({ room, users, onClose, ...props }) => {
  const cardDeck = useInput(room.settings.cardDeck);
  const cardDeckCustom = useInput(room.settings.cardDeckCustom);
  const [usersSettings, setUsersSettings] = useState(users);
  const issueUrl = useInput(room.settings.issueUrl);

  useEffect(() => {
    setUsersSettings(users);
  }, [users]);

  const onCloseModal = () => {
    onClose({
      cardDeck: cardDeck.value,
      cardDeckCustom: cardDeckCustom.value.replace(/\s*,\s*/g, ','),
      issueUrl: issueUrl.value,
      users: usersSettings,
    });
  };

  const setUserRole = (userId, role, e) => {
    const { checked } = e.target;
    const updatedUsers = usersSettings.map(user => {
      if (user.id !== userId) return user;
      return {
        ...user,
        roles: checked ? [...user.roles, role] : user.roles.filter(r => r !== role),
      };
    });
    setUsersSettings(updatedUsers);
  };

  return (
    <ModalWrapper {...props} title="Room Settings" closeText="Save Details" onClose={onCloseModal} width={500} locked={true}>
      <FormSection title="Room Users" collapse>
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th style={{ textAlign: 'center' }}>Estimator</th>
              <th style={{ textAlign: 'center' }}>Spectator</th>
            </tr>
          </thead>
          <tbody>
            {usersSettings.map(user => (
              <tr key={user.id}>
                <td>
                  <strong style={{ color: user.color }}>{user.username}</strong>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Checkbox
                    onChange={e => setUserRole(user.id, USER_ROLES.LEADER, e)}
                    disabled={hasRoles(user, USER_ROLES.OWNER)}
                    value={hasRoles(user, USER_ROLES.OWNER) || hasRoles(user, USER_ROLES.LEADER)}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Checkbox onChange={e => setUserRole(user.id, USER_ROLES.SPECTATOR, e)} value={hasRoles(user, USER_ROLES.SPECTATOR)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FormSection>
      <FormSection title="Deck Settings">
        <Select title="Card Deck" options={cardDeckOptions} {...cardDeck} />
        {cardDeck.value === 'Custom' && <Input title="Card Values (Comma-Delimited)" {...cardDeckCustom} />}
        {cardDeck.value === 'Custom' && <Note style={{ marginTop: -15 }}><strong>Note:</strong> Each card must be max of 3 characters, with a max of 12 cards total.</Note>}
      </FormSection>
      <FormSection title="Additional Settings">
        <Input title="Issue URL" {...issueUrl} />
      </FormSection>
    </ModalWrapper>
  );
};

const mapState = state => ({
  room: selectors.room(state),
  user: userSelectors.details(state),
  users: selectors.users(state),
});

const mapDispatch = {
  updateSettings: actions.updateSettings,
};

export default connect(
  mapState,
  mapDispatch
)(RoomSettingsModal);
