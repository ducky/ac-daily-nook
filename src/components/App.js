import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import store from 'lib/store';

import SiteLayout, { DailyJournalLayout, JournalLayout } from 'layouts';

function App() {
  return (
    <Provider store={store}>
      <SiteLayout>
        <Switch>
          <Route path="/" exact component={DailyJournalLayout} />
          <Route path="/:type" component={JournalLayout} />
          <Redirect to="/" />
        </Switch>
      </SiteLayout>
    </Provider>
  );
}

export default App;
