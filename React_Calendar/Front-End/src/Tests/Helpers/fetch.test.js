import { fetchConToken, fetchSinToken } from "../../Helpers/fetch"

describe('Pruebas en el helper fetch', () => {

    let token = '';
    
    test('fetchSinToken debe de funcionar', async() => {
        
        const resp = await fetchSinToken('auth', { email: 'beni@gmail.com', password: '123456' }, 'POST' );
        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );
        
        token =  body.token;
    })


    test('fetchConToken debe de funcionar', async() => {
        
        localStorage.setItem( 'token', token );

        const resp = await fetchConToken('events/60f9bceeb94af649a82e1ab0', {}, 'DELETE');
        const body = await resp.json();

        expect( body.msg ).toBe( 'No se encuentra evento con ese id' );
    })

})
