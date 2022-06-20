
export const fileUpload = async( file ) => {

    const couldUrl = 'https://api.cloudinary.com/v1_1/harich-projects-react/upload';

    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch( couldUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url
        } else {
            return null;
        }

    } catch ( error ) {
        throw error;
    }


}