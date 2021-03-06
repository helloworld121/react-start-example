import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        // the interceptor must be added before the component was mounted
        // => because an error might occur when loading the application
        constructor(props, context) {
            super(props, context);

            // console.log('[withErrorHandler] constructor');
            // add interceptor for request to CLEAN state
            this.reqInterceptor = axios.interceptors.request.use(
                request => {
                    this.setState({error: null});
                    return request;
                })
            // add interceptor on axios to save if an error occured
            this.resInterceptor = axios.interceptors.response.use(
                response => response,
                error => {
                    //console.log('[withErrorHandler]:', error);
                    this.setState({error: error});
                })
        }

        // we might create the Instance of this Components multiple times
        // => this leads to multiple interceptors we add to axios
        // => this leads to memory issues
        // => therefore we need to remove those interceptors
        componentWillUnmount() {
            // console.log('[withErrorHandler] componentWillUnmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            // console.log('[withErrorHandler] render');
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
