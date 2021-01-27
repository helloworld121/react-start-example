import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        // we have access to the router props
        // => and in the history-prop we have the "goBack()" method
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        // if there are no ingredients loaded yet (they are loaded in the BurgerBuilder)
        // => we redirect to the BurgerBuilder-component
        let summary = <Redirect to={"/"}/>;

        if(this.props.ings) { // if ingredients are available (if they are loaded)
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>

                    {/* NOW: after we use redux, we don't need the workaround 'render' to bypass parameter */}
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                    {/* to pass data using the Route => we can use the render method/parameter */}
                    {/*
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        render={() => (
                            <ContactData
                                ingredients={this.props.ings}
                                price={this.props.price}
                                {...this.props}/>
                        )}/>
                    */}
                </div>
            );
        }

        return summary;
    }

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
};


export default connect(mapStateToProps)(Checkout);
