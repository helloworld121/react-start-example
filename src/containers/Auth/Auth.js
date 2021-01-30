import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';
import {updateObject, checkValidity} from '../../shared/utility';

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
        },
        isSignup: true,
    };

    componentDidMount() {
        // we want to dispatch the AuthRedirectPath if we are not building a burger
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            // this means we are trying to redirect to checkout
            this.props.onSetAuthRedirectPath();
        }
    }


    // TODO refactor => see ContactData
    inputChangedHandler = (event, controlName) => {
        /*
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
        */
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                // set the value
                value: event.target.value,
                // update validity => due to the event
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                // and set touched
                touched: true
            })
        });
        this.setState({controls: updatedControls})
    };

    submitHandler = (event) => {
        // we need the event to prevent the reload of the page
        event.preventDefault();

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    };

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

        let form = formElementsArray.map(formElement => (
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

        if(this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        // if user is authenticated we want to redirect him => and we do this declarative
        let authRedirect = null;
        if(this.props.isAuthenticated) {
            // there are multiple ways on handling the redirect
            // a) store the redirect url in the store and replace it dynamically
            // b) pass the url as a query-parameter
            // c) the most static way would be to add a condition and decide where to redirect to
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {/* TODO: maybe translate error-message => also possible in the action AND do some styling */}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
        // we can hardcode the path in here
        // because always if we call this action we want to set the path to its initial value
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath("/")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
