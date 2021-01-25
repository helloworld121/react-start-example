import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                {/*<Route */}
                {/*    path={this.props.match.path + '/contact-data'} */}
                {/*    component={ContactData} />*/}

                {/* to pass data using the Route => we can use the render method/parameter */}

                {/* NOW: after we use redux, we don't need the workaround 'render' to bypass parameter */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
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

}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
    }
}

// we don't dispatch in here for now, therefore we don't need it right now

export default connect(mapStateToProps)(Checkout);
