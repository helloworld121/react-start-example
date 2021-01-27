import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {type: 'email', placeholder: 'Mail Address'},
                value: '',
                validation: {required: true, isEmail: true},
                valid: false, touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {type: 'password', placeholder: 'Password'},
                value: '',
                validation: {required: true, minLength: 6},
                valid: false, touched: false
            },
        }
    };

    // TODO refactor => see ContactData
    checkValidity(value, rules) {
        // check if rules is defined
        if(!rules) {
            return true;
        }

        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    // TODO refactor => see ContactData
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            // set the changed field
            [controlName]: {
                // copy the changed field
                ...this.state.controls[controlName],
                // set the value
                value: event.target.value,
                // update validity => due to the event
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                // and set touched
                touched: true,
            }
        };
        this.setState({controls: updatedControls})
    };

    submitHandler = (event) => {
        // we need the event to prevent the reload of the page
        event.preventDefault();

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value);
    }

    // TODO refactor => see ContactData
    render() {
        // convert the form-object into an array
        // => so it is possible to loop over it
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                // we need to pass more data to the handler
                // => therefore we use a arrow function (it won't be executed directly
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actionCreators.auth(email, password)),
    };
};

export default connect(null, mapDispatchToProps)(Auth);
