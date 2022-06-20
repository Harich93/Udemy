import { shallow } from "enzyme"
import AddCategory from "../../components/AddCategory"

describe('Pruebas en <AddCategory />', () => {
    
    const setCategoria = jest.fn();
    let wrapper = shallow( <AddCategory setCategoria={ setCategoria } /> );

    beforeEach( () => {
        jest.clearAllMocks();
        wrapper = shallow( <AddCategory setCategoria={ setCategoria } /> );
    });


    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de cambiar el input', () => {
        
        const input = wrapper.find('input');
        const value = 'Hola Mundo';

        input.simulate('change', { target: {value} });


    });

    test('No debe postear la informacion onSubmit ', () => {
        
        wrapper.find('form').simulate( 'submit', { preventDefault(){}} );

        expect( setCategoria ).not.toHaveBeenCalled();

    });

    test('Debe de llamar el setCategoria y limpiar la caja de texte', () => {
        
        const value = 'Cambio input';

        wrapper.find('input').simulate( 'change', { target: { value }});

        wrapper.find('form').simulate( 'submit' , { preventDefault(){} } )

        expect( setCategoria ).toHaveBeenCalled();
        expect( wrapper.find('input').prop('value') ).toBe( '' );


    });
    
    
    
    
})
