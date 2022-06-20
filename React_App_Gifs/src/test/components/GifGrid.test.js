import { shallow } from "enzyme"
import GifGrid from "../../components/GifGrid"
import { useFetchGifs } from "../../hooks/useFetchGifs";
jest.mock("../../hooks/useFetchGifs")


describe('Pruebas en el <GifGrid />', () => {
    
    const categoria = 'Goku';

    test('Snapshot', () => {

        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
         }); 

        const wrapper = shallow( <GifGrid categoria={ categoria }  /> );
         
        expect( wrapper ).toMatchSnapshot(); 
    });

    test('Debe de mostrar items cuando se cargan imagenes useFetchGifs', () => {
       
        const gifs = [{
            id: 'abc',
            url: 'http://localhost/cualquiercosa.jpg',
            title: 'Lo que sea'
        }]

        useFetchGifs.mockReturnValue({
           data: gifs,
           loading: false
        }); 

        const wrapper = shallow( <GifGrid categoria={ categoria }  /> );

        expect( wrapper.find('p').exists() ).toBe( false ); 
        expect( wrapper.find('GrfGridItem').length ).toBe( gifs.length );
        
    });

})
