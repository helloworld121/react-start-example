import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {

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
                        <Route path="/" exact component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </div>
        );
    }

}

export default App;
