import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // TODO this is some dummy state for now
    state = {
        ingredients: null,
        totalPrice: null
    }



    // 1) everytime we load this component it will mount itself
    //    => therefore we can use 'componentDidMount'
    //    it is not nested in another page or something like this
    // 2) we must not use componentDidMount if we initialize ingredients in here
    //    => because this will be called after rendering
    //       and if we pass null to ContactData and the Burger component those will fail
    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        for(let param of query.entries()) {
            // TODO workaround to extract the price from queryParams
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        // we have access to the router props
        // => and in the thistory-prop we have the "goBack()" method
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                {/*<Route */}
                {/*    path={this.props.match.path + '/contact-data'} */}
                {/*    component={ContactData} />*/}

                {/* to pass data using the Route => we can use the render method/parameter */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)}/>
            </div>
        );
    }

}

export default Checkout;
