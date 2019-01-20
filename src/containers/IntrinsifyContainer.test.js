import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IntrinsifyTable from '../components/IntrinsifyTable/IntrinsifyTable';
import Submit from '../components/Controls/Submit/Submit';
import TickerTextInput from '../components/Controls/TickerTextInput/TickerTextInput';
import IntrinsifyContainer from './IntrinsifyContainer/IntrinsifyContainer';

configure({adapter: new Adapter()});

describe('<IntrinsifyContainer />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<IntrinsifyContainer />);
    });

    it('should render TickerTextInput, Submit, and IntrinsifyTable components', () => {
        expect(wrapper.containsAllMatchingElements([
            <TickerTextInput />,
            <Submit />,
            <IntrinsifyTable />
        ])).toEqual(true);
    });
});