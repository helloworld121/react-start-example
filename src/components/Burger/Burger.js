import React from 'react';
// import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // transform object to an array
    let transformedIngredients =
        Object
            .keys(props.ingredients)
            .map(ingredientKey => {
                // currently we have a map of "key = number"
                // => this should be transformed into an array containing the "number" of "keys"
                //    for example: cheese=2 should be transformend into ["cheese", "cheese"]
                return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                    // now we create a Component for each ingredient
                    // we just use the index for the key of the Component
                    return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
                })
            })
            // currently the result looks like this // [Array(0), Array(0), Array(0), Array(0)]
            // but we want to flatten the array to for example check if we got ingredients
            .reduce((arr, el) => {
                return arr.concat(el)
            }, [])
    ;

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

// if we wrap the exported component with a hoc named "withRouter"
// we will get access to to those special router-props
// export default withRouter(burger);
export default burger;
