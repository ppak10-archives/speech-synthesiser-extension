/**
 * SettingsPage.tsx
 * Page component for managing extension settings.
 */

// Node Modules
import { FC } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

// Components
import Speech from './route/Speech';
import Theme from './route/Theme';

const SettingsPage: FC = () => {
  // Hooks
  const match = useRouteMatch();

  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.path}/speech`}>Speech</Link>
        </li>
        <li>
          <Link to={`${match.path}/theme`}>Theme</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/speech`} component={Speech} />
        <Route path={`${match.path}/theme`} component={Theme} />
      </Switch>
    </div>
  );
}

export default SettingsPage;
