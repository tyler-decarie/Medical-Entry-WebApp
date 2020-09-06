import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import PrivateRoute from './components/PrivateRoute';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Entry as EntryView
} from './views';

import EmailSent from './views/SignUp/EmailSent';
import SelectSignUp from './views/SignUp/SelectSignUp';
import SignUp from './views/SignUp/SignUp';
import SignUpMed from './views/SignUp/SignUpMed';
import Forgot from './views/SignIn/Forgot';
import Reset from './views/SignIn/Reset';
import Verified from './views/SignUp/Verified';
import SignInMed from './views/SignIn/SignInMed';
import UserList from './views/UserList/UserList';
import MedProList from './views/MedProList/UserList';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={EntryView}
        exact
        layout={MainLayout}
        path="/entry"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SelectSignUp}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignUp}
        exact
        layout={MinimalLayout}
        path="/sign-up-patient"
      />
      <RouteWithLayout
        component={SignUpMed}
        exact
        layout={MinimalLayout}
        path="/sign-up-med"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={SignInMed}
        exact
        layout={MinimalLayout}
        path="/sign-in-med"
      />
      <RouteWithLayout
        component={Verified}
        exact
        layout={MinimalLayout}
        path="/register/:token"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={EmailSent}
        exact
        layout={MinimalLayout}
        path="/email-sent"
      />
      <RouteWithLayout
        component={Forgot}
        exact
        layout={MinimalLayout}
        path="/forgot"
      />
      <RouteWithLayout
        component={Reset}
        exact
        layout={MinimalLayout}
        path="/reset/:token"
      />
      <RouteWithLayout
        component={UserList}
        exact
        layout={MainLayout}
        path="/patients"
      />
      <RouteWithLayout
        component={MedProList}
        exact
        layout={MainLayout}
        path="/medpros"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
