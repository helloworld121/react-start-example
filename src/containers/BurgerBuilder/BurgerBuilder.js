import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import axios from '../../axios-orders';


// adding export to class we can easily write tests, because we don't need the redux-store
// => export the class we STRIP OUT the CONNECTION to REDUX
export class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
    }

    componentDidMount() {
        //console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        // due to the fact how setState work it is possible, that accessing the state
        // we get outdated data
        const sum = Object
            .keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0); // 0 is the initial value for sum

        return sum > 0
    }

    // normal function syntax using "this" won't work if the method is triggered throw an event
    // for example "purchaseHandler() {"
    // => the key-word "this" will reference a different execution context
    //    and "setState" might not be available or a different object
    // ES6 Arrow function will contain the context of "this"
    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            // we only want to set the state we the user is logged in
            this.setState({purchasing: true});
        } else {
            // otherwise we want to redirect to login - page
            // => the PROBLEM is, that after authenticating
            //    the user gets redirected back to BurgerBuilder and loses the Burger
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // we need to start the process before we render the new component
        // => this is necessary because we want to redirect if it is finished
        this.props.onInitPurchase();

        // everything that gets loaded via a route gets that special props
        // we push a new page on the stack of pages
        // this.props.history.push('/checkout');
        this.props.history.push('/checkout');
    }

    render() {
        // copy the ingredient object and add information if remove-button must be disabled
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // structure: {salad: true, meat: false, ....}
        let orderSummary = null;

        // if ingredients could not be loaded we display a message an not a spinner
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchasedCancelled={this.purchaseCancelHandler}
                    purchasedContinue={this.purchaseContinueHandler}/>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
