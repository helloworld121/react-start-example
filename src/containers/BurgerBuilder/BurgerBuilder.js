import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false
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

    render() {
        // copy the ingredient object and add information if remove-button must be disabled
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // structure: {salad: true, meat: false, ....}

        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }

}

export default BurgerBuilder;
