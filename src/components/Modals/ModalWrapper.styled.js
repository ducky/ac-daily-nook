import styled from 'styled-components';

import theme, { MEDIA_TINY, transparentize } from '../../styles/theme';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 209;
  padding: 100px 100px 0;
  overflow: auto;
  background: ${props => transparentize(theme.B800, 0.7)};

  &:after {
    display: block;
    content: '';
    height: 100px;
    width: 100%;
  }

  .modal-enter & {
    opacity: 0.01;
  }

  .modal-enter.modal-enter-active & {
    opacity: 1;
    transition: opacity ${props => props.transitionEnter};
  }

  .modal-leave & {
    opacity: 1;
  }

  .modal-leave.modal-leave-active & {
    opacity: 0.01;
    transition: opacity ${props => props.transitionLeave};
  }

  @media (max-width: ${MEDIA_TINY}) {
    padding: 0;
  }
`;

const Modal = styled.div`
  background: ${props => theme.B300};
  color: ${props => theme.font_primary};
  border-radius: 5px;
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  padding: ${props => (props.collapse ? '0' : '24px')};
  max-width: 1024px;
  margin: 0 auto;
  transform-origin: top center;

  .Modal__header {
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 25px;
  }

  .Modal__content {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    margin: 0 0 25px;

    a {
      color: ${theme.font_primary};
      text-decoration: underline;
    }

    p {
      margin: 0 0 15px;

      &:last-child {
        margin: 0;
      }
    }

    &:last-child {
      margin: 0;
    }

    ul {
      margin: 0 0 15px;
      padding-left: 15px;

      li {
        margin: 0 0 8px;
      }
    }
  }

  .Modal__footNote {
    position: absolute;
    left: 50%;
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
    transform: translateX(-50%) translateY(100%);
  }

  .modal-enter & {
    transform: scale(0.9);
    opacity: 0.01;
  }

  .modal-enter.modal-enter-active & {
    transform: scale(1);
    opacity: 1;
    transition: transform ${props => props.transitionEnter}, opacity ${props => props.transitionEnter};
  }

  .modal-leave & {
    transform: scale(1);
    opacity: 0.1;
  }

  .modal-leave.modal-leave-active & {
    transform: scale(0.7);
    opacity: 0.01;
    transition: transform ${props => props.transitionLeave}, opacity ${props => props.transitionLeave};
  }

  @media (max-width: ${MEDIA_TINY}) {
    width: auto !important;
  }
`;

export const ModalActions = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.length || 2}, 1fr);
  grid-gap: 0 6px;
`;

export default Modal;
