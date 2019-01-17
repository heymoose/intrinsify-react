import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MaterialButton from './MaterialButton';
import Button from '@material-ui/core/Button';

configure({adapter: new Adapter()});

describe('<MaterialButton />', () => {
    it('should render a <Button />', () => {
        const wrapper = shallow(<MaterialButton
            variant='contained'
            color='primary'
            text='Test'
            click={() => {}} />).first().shallow();

        expect(wrapper.find(Button)).toHaveLength(1);
    });
});