import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            console.log('[withErrorHandler] componentDidMount');
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
                    console.log('[withErrorHandler]:', error);
                    this.setState({error: error});
                })
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
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
