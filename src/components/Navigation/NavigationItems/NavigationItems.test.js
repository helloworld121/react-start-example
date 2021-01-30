import React from 'react';

import { configure, shallow } from 'enzyme';
import ReactSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new ReactSeventeenAdapter() });


// jest provides "describe" which takes two arguments
// a) the description of the test-bundle this file holds
// b) the test-function
describe('<NavigationItems />', () => {

    // jest function, that describes on specific test, it also holds two arguments
    // a) a description => that completes a sentence starting with "it"
    // b) a testing-function describing the actual test
    it('should render two <NavigationItems /> elements fi not authenticated', () => {

        // to render a certain component we need enzyme
        // "shallow" => renders a component with all its content BUT the component is not deeply rendered
        //           => the NESTED component are rendered as PLACEHOLDERS => their content is not rendered
        const wrapper = shallow(<NavigationItems/>);

        // expect is an jest function to write expectations
        // => "find" is a function provided by enzyme
        // => "toHaveLength" a jest function to define how many we expect to find
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

});
