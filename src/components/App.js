import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import store from 'lib/store';

import SiteLayout, { DailyJournalLayout, PediaLayout } from 'layouts';

function App() {
  return (
    <Provider store={store}>
      <SiteLayout>
        <Switch>
          <Route path="/" exact component={DailyJournalLayout} />
          <Route path="/bugs" component={() => <PediaLayout type="BUG" />} />
          <Route path="/fish" component={() => <PediaLayout type="FISH" />} />
          <Redirect to="/" />
        </Switch>
      </SiteLayout>
    </Provider>
  );
}

export default App;
