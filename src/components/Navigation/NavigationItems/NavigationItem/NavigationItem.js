import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/*
        1) the default active-classname is active
            => but because we are using css-modules the class-names become unique
            => therefore we need to pass it using activeClassName
        2) url-matching
            => because NavLink matches everything starting with the given "to"-value
               we need to add the property exact to match the given paths we want
        */}
        <NavLink
            to={props.link}
            exact={props.matchExact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
