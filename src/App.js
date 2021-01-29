import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';

class App extends Component {

    componentDidMount() {
        // as soon as the user opens the app we can check if there are still auth-infos in the localStorage
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div>
                <Layout>
                    {/*
                        having one route "/"
                        there are two possible ways to make route under "/" not render on every url
                        => one way is using "exact" which will check for an exact match
                        => the other way is using "<Switch>" but in this case the order will matter
                           => because the first match will be rendered
                              or we use exact

                        the example below display both solutions
                    */}
                    <Switch>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/auth" component={Auth}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/" exact component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
    };
};

// withRouter will force our props to pass them down to our components
// in previous versions of react-router the withRouter was necessary, now it doesn't seem so...
// => withRouter => if a component was loaded with routing but the component doesn't receive the route props
//                  AND therefore it don't get displayed
export default withRouter(connect(null, mapDispatchToProps)(App));
