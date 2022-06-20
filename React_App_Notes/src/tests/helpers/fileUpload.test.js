import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'harich-projects-react', 
    api_key: '489482454615937', 
    api_secret: 'hAVGQ7lFR1p9vBSf85q09P1g3eg',
});

describe('Pruebas en fileUpload', () => {
    
    test('Debe de cargar un archivo y retornar la URL', async() => {
        
        const resp = await fetch('https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2159024400&v=beta&t=CrP5Le1mWICRcaxIGNBuajHcHGFPuyNA5C8DI339lSk');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imgId = segments[segments.length -1].replace('.png','')

        cloudinary.v2.api.delete_resources(imgId, {}, () => {});
    });

    test('Debe de retornar un error', async() => {
        
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect( url ).toBe(null);

    });
});