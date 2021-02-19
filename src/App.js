import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';


// ==> USING asyncComponent to load COMPONENTS ASYNC => using dynamic import
// import Checkout from './containers/Checkout/Checkout';
const asyncCheckout = asyncComponent(() => {return import('./containers/Checkout/Checkout')});
//import Orders from './containers/Orders/Orders';
const asyncOrders = asyncComponent(() => {return import('./containers/Orders/Orders')});
// import Auth from './containers/Auth/Auth';
const asyncAuth = asyncComponent(() => {return import('./containers/Auth/Auth')});

class App extends Component {

    componentDidMount() {
        // as soon as the user opens the app we can check if there are still auth-infos in the localStorage
        this.props.onTryAutoSignup();
    }

    render() {
        // having one route "/"
        // there are two possible ways to make route under "/" not render on every url
        //     => one way is using "exact" which will check for an exact match
        //     => the other way is using "<Switch>" but in this case the order will matter
        //     => because the first match will be rendered
        // or we use exact
        //
        // the example below display both solutions

        // GUARDS: define which routes are for which users available
        // routes for UNAUTHENTICATED users
        let routes = (
            <Switch>
                {/*<Route path="/auth" component={Auth}/>*/}
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                {/*all not matching (unknown) requested routes should be redirected*/}
                <Redirect to="/" />
            </Switch>
        );
        // routes for AUTHENTICATED users
        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    {/*<Route path="/checkout" component={Checkout}/>*/}
                    <Route path="/checkout" component={asyncCheckout}/>
                    {/*<Route path="/orders" component={Orders}/>*/}
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    {/*we keep the auth-route in here to make the redirect on the Auth-page work*/}
                    {/*<Route path="/auth" component={Auth}/>*/}
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    {/*all not matching (unknown) requested routes should be redirected*/}
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
    };
};

// withRouter will force our props to pass them down to our components
// in previous versions of react-router the withRouter was necessary, now it doesn't seem so...
// => withRouter => if a component was loaded with routing but the component doesn't receive the route props
//                  AND therefore it don't get displayed
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
