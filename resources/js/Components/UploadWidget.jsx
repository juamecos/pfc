import { useEffect, useRef } from 'react';

export default function UploadWidget() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        console.log(window.cloudinary);
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'lapisgame',
            uploadPreset: 'stones_preset',
            sources: [
                'local',
                'url',
                'camera',
                'image_search',
            ],

        }, function (error, result) {
            console.log(result.data.info.files[0].uploadInfo.url);
        });
    }, []);

    return (
        <div>
            <button onClick={() => widgetRef.current.open()}>
                Upload
            </button>
        </div>
    );
}

