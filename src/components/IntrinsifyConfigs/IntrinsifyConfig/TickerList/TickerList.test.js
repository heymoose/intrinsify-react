import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TickerList from './TickerList';

configure({ adapter: new Adapter() });

describe('<TickerList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TickerList />);
    });

    it('should render a <span> element', () => {
        expect(wrapper.find('span')).toHaveLength(1);
    });

    it('should dynamically render ticker list input from props', () => {
        wrapper.setProps({ tickers: ['KO, DIS'] });
        expect(wrapper.text()).toEqual('KO, DIS');
    });
});
