import { shallow } from "enzyme";
import GifExpertApp from '../GifExpertApp';

describe('Pruebas en <GifExpertApp />', () => {
    
    test('Snapshot', () => {
        const wrapper = shallow( <GifExpertApp />);
        expect( wrapper ).toMatchSnapshot
    });
    
    test('Debe mostrar una lista de categorias', () => {
        
        const categorias = [ 'Goku', 'Days Gone'];
        const wrapper = shallow( <GifExpertApp defaulCategoria={ categorias } /> );

        expect( wrapper).toMatchSnapshot();
        expect( wrapper.find('GifGrid').length ).toBe( categorias.length );

    });
    
})
