import getGifs from "../../helpers/getgifs"


describe('Pruebas getGifs Fetch', () => {
    
    test('Debe de traer 10 elementos', async() => {
        
        const gifs = await getGifs('Days Gone');
        expect( gifs.length ).toBe( 10 );
    })
    
})
