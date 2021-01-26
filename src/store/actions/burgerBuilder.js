import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


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
        error: true,
    }
};
// this is the ASYNC-Action-Creator
// => it MUST dispatch a SYNC-Action-Creator
export const initIngredients = () => {
    // this dispatch function is available due to redux-thunk
    // => thunk will interrupt the current action AND makes it possible to dispatch a new one
    return (dispatch) => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            // if the "catch" block is missing, the "then" block will be executed even if an error occurred
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};
