import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  HomePage, IndexPage, LoginPage, LogoutPage, NotFoundPage, RegisterPage,
} from './pages';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <IndexPage />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/logout">
        <LogoutPage />
      </Route>
      <NotFoundPage />
    </Switch>
  </BrowserRouter>
);

export default App;
