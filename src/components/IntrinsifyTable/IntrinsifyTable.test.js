import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IntrinsifyTable from './IntrinsifyTable';

configure({adapter: new Adapter()});

describe('<IntrinsifyTable />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<IntrinsifyTable dummyData />);
    });

    it('should show dummy data message if dummyData prop is true', () => {
        expect(wrapper.find('p')).toHaveLength(1);
    });
});