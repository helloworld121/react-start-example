import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // transform object to an array
    const transformedIngredients =
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
            });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
