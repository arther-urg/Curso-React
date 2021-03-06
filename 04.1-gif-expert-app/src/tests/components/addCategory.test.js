import React from 'react';
import { shallow } from 'enzyme';
import { AddCategory } from '../../components/AddCategory';

describe('Pruebas en <AddCategory />', () => {
    
    const setCategories = jest.fn();
    let wrapper = shallow( <AddCategory setCategories={ setCategories } /> );

    beforeEach( () => {
        jest.clearAllMocks();
        wrapper = shallow( <AddCategory setCategories={ setCategories } /> );

    })

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('debe cambiar la caja de texto', () => {
        
        const input = wrapper.find('input');
        const value = 'Hola mundo';
        input.simulate('change', {
            target: {
                value: value
            }
        })

        expect( wrapper.find('p').text().trim() ).toBe( value )
    })
    
    test('no debe de postear la info con submit', () => {
        
        wrapper.find('form').simulate('submit', { preventDefault(){} });

        expect( setCategories ).not.toHaveBeenCalled();
    })

    test('debe de llamar el setCategories y limpiar la caja de texto', () => {

        const input = wrapper.find('input');

        // 1. Simular el input change
        const value = 'simular el input change';
        input.simulate('change', {
            target: {
                value: value
            }
        })

        // 2. simular el submit
        wrapper.find('form').simulate('submit', {
            preventDefault(){} 
        });

        // 3. setCategories se debe de haber llamado
        expect( setCategories ).toHaveBeenCalled();
        // expect( setCategories ).toHaveBeenCalledWith( expect.any(Function) );

        // 4. el valor del input debe de estar ''
        expect(wrapper.find('input').prop('value')).toBe('')

    })
    
})
