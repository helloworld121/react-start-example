import * as actionTypes from './actionTypes';

// these are our action-creators for burgerBuilder

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

// this action-creator will only be used internally
// => this is the SYNC-Action-Creator
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
};
// this sync-action-creator will be used if initIngredients failed
// => this is an internal action-creator
// => it will only be used by an async action-creator
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        // error: true,
    }
};
export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
    }
};
