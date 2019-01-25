import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IntrinsifyConfig from './IntrinsifyConfig';
import TickerList from './TickerList/TickerList';

configure({ adapter: new Adapter() });

describe('<IntrinsifyConfig />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<IntrinsifyConfig />);
    });

    it('should render a div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('should render a <span> element', () => {
        expect(wrapper.find('span')).toHaveLength(1);
    });

    it('should render a TickerList element', () => {
        expect(wrapper.find(TickerList)).toHaveLength(1);
    });
});
