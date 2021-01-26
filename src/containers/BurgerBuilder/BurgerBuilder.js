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



class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
    }

    componentDidMount() {
        // console.log(this.props);
        // TODO migrate to redux => for now avoid ajax-calls
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         // console.log('[BurgerBuilder] componentDidMount:', response.data)
        //         this.setState({ingredients: response.data});
        //     })
        //     // if the "catch" block is missing, the "then" block will be executed even if an error occurred
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // everything that gets loaded via a route gets that special props
        // we push a new page on the stack of pages
        // this.props.history.push('/checkout');
        this.props.history.push('/checkout');

        //alert('you continue!');
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
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
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
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
