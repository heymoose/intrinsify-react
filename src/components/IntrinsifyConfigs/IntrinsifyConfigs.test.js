import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IntrinsifyConfigs from './IntrinsifyConfigs';
import IntrinsifyConfig from './IntrinsifyConfig/IntrinsifyConfig';

configure({ adapter: new Adapter() });

describe('<IntrinsifyConfigs />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<IntrinsifyConfigs />);
    });

    it('should not render any IntrinsifyConfig elements if no saved configs are in the store', () => {
        expect(wrapper.find(IntrinsifyConfig)).toHaveLength(0);
    });
});
