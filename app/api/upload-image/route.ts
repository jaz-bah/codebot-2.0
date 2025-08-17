import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    [key: string]: string | number | boolean | undefined;
}


const fileValidator = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!file || allowedTypes.indexOf(file.type) === -1) {
        return false;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
        return false;
    }

    return true;
}


export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file || !fileValidator(file)) {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "codebot" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result as CloudinaryUploadResult);
                    }
                }
            ).end(buffer);
        });

        return NextResponse.json(
            {
                public_id: response.public_id,
                url: response.secure_url
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Failed to upload image:", error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}