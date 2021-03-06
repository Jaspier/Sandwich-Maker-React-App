import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import SandwichMaker from './containers/SandwichMaker/SandwichMaker';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount () { // if sign in token is not expired users stay logged in
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = ( // routes for unauthenticated users
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={SandwichMaker} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) { // routes only for authenticated users
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={SandwichMaker} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
