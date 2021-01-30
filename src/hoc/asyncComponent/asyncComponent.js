import React, { Component } from 'react';

// this component takes a function as an import which it executes later on
// CHECKING:
// => to validate if async-loading works use in DEV-Tools the tab with "Network"-traffic
//    AND check if there are new "chunk"-files loaded for defiend components (like "3.chunk.js")
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            // here is the function executed
            // this function uses the DYNAMIC IMPORT SYNTAX
            // => this gives us a promise with the component we want to load
            //    AND this component will then be rendered
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;
