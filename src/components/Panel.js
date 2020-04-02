import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

const StyledPanel = styled.div`
  background: ${theme.B400};
  color: ${theme.font_primary};
  border: 1px solid ${theme.B700};
  margin: 0 0 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;

  &:last-child {
    margin: 0;
  }

  .Panel__header {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    background: ${theme.B600};
    border-bottom: 2px solid ${theme.B700};
    padding: 15px;

    &-left {
      margin-right: 10px;
    }

    &-right {
      margin-left: auto;
    }
  }

  .Panel__content {
    padding: ${props => (props.collapse ? 0 : '15px')};
  }
`;

const Panel = ({ children, addon, title, defaultClosed, ...rest }) => {
  // const [toggled, setToggled] = useState(!defaultClosed);

  // TODO
  // const onToggle = () => setToggled(t => !t);

  return (
    <StyledPanel {...rest}>
      {title && (
        <div className="Panel__header">
          <div className="Panel__header-left">{title}</div>
          <div className="Panel__header-right">{addon}</div>
        </div>
      )}
      {/* {toggled && <div className="Panel__content">{children}</div>} */}
      <div className="Panel__content">{children}</div>
    </StyledPanel>
  );
};

export default Panel;
