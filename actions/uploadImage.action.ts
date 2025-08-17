


export const uploadImage = async (file: File) => {

    if(!file || typeof file !== 'object' || !file.name || !file.type || !file.size) {
        return {
            error: "Invalid file"
        }

    };

    const formData = new FormData();
    formData.append('file', file);


    try {
        const response = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
        });
        return response.json();
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            error: "Failed to upload image"
        }
    }
};
