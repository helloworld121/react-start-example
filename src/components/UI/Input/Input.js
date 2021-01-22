import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement;

    // 1) using the spread operator we will pass all given attributes to the component
    //    => {...props}
    //    => this will reduce the complexity because we can use the standard html-attributes
    // 2) attention: the spread-operator will pass all attributes
    //    => therefore also not-html-attributes will be passed
    //       if they are not lowercase they will raise an error
    switch(props.elementType) {
        case('input'):
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;
