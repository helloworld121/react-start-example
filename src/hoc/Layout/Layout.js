import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// because one purpose of Layout is, to wrap other components
// => it is a higher order component
class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        // this approach may lead to unexpected behavior
        // => due to async way setState work
        // this.setState({showSideDrawer: !this.state.showSideDrawer});

        // to work with previous state use the funcation-way
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

export default Layout;
