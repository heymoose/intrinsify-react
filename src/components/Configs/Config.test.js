import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Config from './Config';

configure({adapter: new Adapter()});

describe('<IntrinsifyContainer />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Config />);
    });

    it('should render a div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
});