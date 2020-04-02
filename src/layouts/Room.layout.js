import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';

import theme from '../styles/theme';
import { actions, selectors } from '../modules/base';
import { actions as userActions, selectors as userSelectors } from '../modules/user';

import Header from '../components/Header';
import Board from '../components/Board';
import Chat, { ChatNugget } from '../components/Chat';
import RoomActions from '../components/Room/RoomActions';

const StyledLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;

  .Root__header {
    flex: 0 0 auto;
  }

  .Root__body {
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    min-height: 0;
  }

  .Root__content {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
  }

  .Root__sidebar {
    position: relative;
    display: flex;
    flex-flow: column;
    border-left: 3px solid ${theme.B700};
    min-height: 0;

    &-content {
      display: flex;
      flex: 1 1 auto;
      flex-flow: column;
      min-height: 0;
      width: 350px;
      max-width: 350px;
      overflow: hidden;
      transition: all 500ms;

      ${props => !props.sidebarVisible && `max-width: 0 !important`};
    }
  }
`;

const RoomLayout = ({ match, room, roomJoin, isAuthenticated, isConnected, isInRoom, isSidebarVisible, onToggleSidebar }) => {
  const { roomId } = match.params;

  useEffect(() => {
    if (isAuthenticated && isConnected) roomJoin(roomId);
  }, [isAuthenticated, isConnected]);

  if (!isInRoom) return null;

  return (
    <StyledLayout sidebarVisible={isSidebarVisible}>
      <div className="Root__header">
        <Header title={room.name} actions={<RoomActions />} />
      </div>
      <div className="Root__body">
        <div className="Root__content">
          <Board />
        </div>
        <div className="Root__sidebar">
          <ChatNugget className="Root__sidebar-nugget" onClick={onToggleSidebar} />
          <div className="Root__sidebar-content">
            <Chat />
          </div>
        </div>
      </div>
    </StyledLayout>
  );
};

const mapState = state => ({
  room: selectors.room(state),
  isAuthenticated: userSelectors.isAuthenticated(state),
  isConnected: selectors.isConnected(state),
  isInRoom: selectors.isInRoom(state),
  isSidebarVisible: selectors.isSidebarVisible(state),
});

const mapDispatch = {
  roomJoin: actions.roomJoin,
  onToggleSidebar: actions.toggleSidebar,
  updateUser: userActions.updateUser,
};

const enhance = compose(
  withRouter,
  connect(
    mapState,
    mapDispatch
  )
);

export default enhance(RoomLayout);
