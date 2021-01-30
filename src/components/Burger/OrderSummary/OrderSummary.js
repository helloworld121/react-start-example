import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

// we change OrderSummary to a class-based-component
// => so we can add live-cycle-hooks
// => we want to see when it gets rerendered
class OrderSummary extends Component {

    // after adding diese method with log-entry
    // we will see, that the components gets updated even if we don't show it
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('[OrderSummary] componentDidUpdate');
    // }

    render() {
        const ingredientSummary = Object
            .keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
                    </li>
                );
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchasedCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchasedContinue}>CONTINUE</Button>
            </Aux>
        );
    }


}

export default OrderSummary;
