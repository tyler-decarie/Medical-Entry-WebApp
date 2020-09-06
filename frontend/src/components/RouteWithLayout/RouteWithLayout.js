import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenthicate } from '../../views/token';
import axios from 'axios';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  console.log(props);
  return (

    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
