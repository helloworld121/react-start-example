import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// to test a reducer we don't need enzyme
// => we just test normal java-script code

describe('auth reducer', () => {

    it('should return initial state', () => {
        // the object in here is the initial js-object from reducer
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });

    it('should store the token upon login', () => {
        // the object in here is the initial js-object from reducer
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken:'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    })

});
