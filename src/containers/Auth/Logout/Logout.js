import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

class Logout extends Component {

    // as soon as this component gets called we do the logout
    componentDidMount() {
        // we don't do the redirect in here, we do the redirect declarative
        this.props.onLogout();
    }

    render() {
        // declarative redirect
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
