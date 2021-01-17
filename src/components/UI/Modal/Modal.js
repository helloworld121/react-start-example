import React, {Component} from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // we want to see when compoents gets updated
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal] componentDidUpdate');
    }

    // alternatively to switch to class-based component to implement a life-cycle-method
    // we can wrap the exported component (function-based) with react-memo
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // we only need to update this component when "show" changes
        return nextProps.show !== this.props.show;
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }

}

export default Modal;
