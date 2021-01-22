import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Your Name'},
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Street'},
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'ZIP Code'},
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Country'},
                value: ''
            },
            email: {
                elementType: 'email',
                elementConfig: {type: 'text', placeholder: 'Your E-Mail'},
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]},
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        // the default is, that the form sends a request => we don't want this
        event.preventDefault();
        // console.log(this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                // after successful passing data => redirect
                // to enable access to the push method we can
                // 1) wrap this component with the "withRouter"-Method
                // 2) we can pass history using props
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: true});
            });

    }

    // the event on its own won't be enough
    // => we need to identify the targeted object to set its "value"
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        // attention we need to set the state in an immutable way
        // ATTENTION THE SPREAD OPERATOR WON'T CLONE DEEPLY
        const updateOrderForm = {
            ...this.state.orderForm
        };
        // because we just want to update the nested field "value"
        // it will be enough if we clone just the formElement
        // => if we want to change something more deeply we need to take care of those nested objects
        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        // now we can update our cloned form
        updateOrderForm[inputIdentifier] = updateFormElement;

        // now we can update the state
        this.setState({orderForm: updateOrderForm});
    }

    render () {
        // convert the form-object into an array
        // => so it is possible to loop over it
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <form>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        // we need to pass more data to the handler
                        // => therefore we use a arrow function (it won't be executed directly
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;
