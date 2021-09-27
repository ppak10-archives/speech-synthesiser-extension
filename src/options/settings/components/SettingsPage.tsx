/**
 * SettingsPage.tsx
 * Page component for managing extension settings.
 */

// Node Modules
import { FC } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Speech from './route/Speech';
import Theme from './route/Theme';

// Styled Components
const StyledSettingsPage = styled.div`
  display: flex;
`;

const SettingsPage: FC = () => {
  // Hooks
  const match = useRouteMatch();

  return (
    <StyledSettingsPage>
      <nav>
        <ul>
          <li>
            <Link to={`${match.path}/speech`}>Speech</Link>
          </li>
          <li>
            <Link to={`${match.path}/theme`}>Theme</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={`${match.path}/speech`} component={Speech} />
        <Route path={`${match.path}/theme`} component={Theme} />
      </Switch>
    </StyledSettingsPage>
  );
}

export default SettingsPage;
