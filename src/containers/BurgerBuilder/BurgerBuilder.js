import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0,
        // },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                // console.log('[BurgerBuilder] componentDidMount:', response.data)
                this.setState({ingredients: response.data});
            })
            // if the "catch" block is missing, the "then" block will be executed even if an error occurred
            .catch(error => {
                this.setState({error: true});
            });
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

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        // update ingredients
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // update state in a immutable way
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        // update price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // update state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        // update purchasable
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // update ingredients
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        // update state in a immutable way
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        // update price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        // update state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        // update purchasable
        this.updatePurchaseState(updatedIngredients);
    }

    // normal function syntax using "this" won't work if the method is triggered throw an event
    // for example "purchaseHandler() {"
    // => the key-word "this" will reference a different execution context
    //    and "setState" might not be available or a different object
    // ES6 Arrow function will contain the context of "this"
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // everything that gets loaded via a route gets that special props
        // we push a new page on the stack of pages
        // this.props.history.push('/checkout');

        const queryParams = [];
        // add ingredients
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        // add price
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        //alert('you continue!');
    }

    render() {
        // copy the ingredient object and add information if remove-button must be disabled
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // structure: {salad: true, meat: false, ....}
        let orderSummary = null;

        // if ingredients could not be loaded we display a message an not a spinner
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchasedCancelled={this.purchaseCancelHandler}
                    purchasedContinue={this.purchaseContinueHandler}/>
            );
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axios);
