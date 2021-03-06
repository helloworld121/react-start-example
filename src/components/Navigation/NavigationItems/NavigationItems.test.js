import React from 'react';

import { configure, shallow } from 'enzyme';
import ReactSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new ReactSeventeenAdapter() });

// official documentation:
// jest: https://jestjs.io/docs/en/getting-started
// enzyme: https://enzymejs.github.io/enzyme/docs/api/
//
// jest provides "describe" which takes two arguments
// a) the description of the test-bundle this file holds
// b) the test-function
describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper =  shallow(<NavigationItems/>);
    });

    // jest function, that describes on specific test, it also holds two arguments
    // a) a description => that completes a sentence starting with "it"
    // b) a testing-function describing the actual test
    it('should render two <NavigationItems /> elements fi not authenticated', () => {

        // to render a certain component we need enzyme
        // "shallow" => renders a component with all its content BUT the component is not deeply rendered
        //           => the NESTED component are rendered as PLACEHOLDERS => their content is not rendered
        //const wrapper = shallow(<NavigationItems/>);

        // expect is an jest function to write expectations
        // => "find" is a function provided by enzyme
        // => "toHaveLength" a jest function to define how many we expect to find
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems /> elements if authenticated', () => {
        //const wrapper = shallow(<NavigationItems isAuthenticated/>);

        // we can use setProps an enzyme function to update props
        wrapper.setProps({isAuthenticated: true});

        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    // this test checks if a specific element exists
    it('should render the Logout-<NavigationItem>', () => {
        // each test runs independent of the others, therefore we need to setProps another time
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
