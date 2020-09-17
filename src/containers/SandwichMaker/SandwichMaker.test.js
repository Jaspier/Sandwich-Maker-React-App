import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SandwichMaker} from './SandwichMaker';
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<SandwichMaker />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SandwichMaker onInitIngredients={() => {}} />)
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});