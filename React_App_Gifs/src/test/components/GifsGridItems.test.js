import GifGridItem from "../../components/GifGridItem";
import { shallow } from 'enzyme';
import React from 'react';



describe('Pruebas <GifGridItem />', () => {


    const title = 'Un titulo';
    const url   = 'https://localhost.algo'
    const wrapper = shallow( <GifGridItem title={ title } url={ url } /> );
    
    test('Debe mostrar el componente correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de tener un parrafo con el title', () => {
        
        const p = wrapper.find( 'p' );

        expect( p.text().trim() ).toBe( title );

    });

    test('Debe de tener una img con un src con el valor de url y un alt con el valor del titulo', () => {
        
        const img = wrapper.find( 'img' );

        expect( img.prop( 'src' ) ).toBe( url );
        expect( img.prop( 'alt') ).toBe( title );


    });

    test('Debe tener animate__fadeInTopLeft', () => {
        
        const div = wrapper.find( 'div' );

        const className = div.prop('className')

        expect( className.includes('animate__fadeInTopLeft') ).toBe( true );

    })
    

    
    
});
