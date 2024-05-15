// Components/Forms/StoneImageInput.js
import React, { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/Forms/InputLabel';
import InputError from '@/Components/Forms/InputError';
import Icon from '@/Components/Icon';
import { imageOutline } from 'ionicons/icons';



/**
 * A custom React component for uploading a single stone image.
 * @param {Object} props - The component's props.
 * @param {string} [props.label] - The label text for the input.
 * @param {string} [props.subLabel] - The sublabel text for the input.
 * @param {string} [props.cloudName] - The Cloudinary account's cloud name.
 * @param {string} [props.uploadPreset] - The Cloudinary upload preset.
 * @param {string} [props.folderPath='stones'] - The Cloudinary folder path for uploads.
 * @param {Function} [props.onUpload] - Callback function when the image is successfully uploaded.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @returns {JSX.Element} - The rendered StoneImageInput component.
 */
export default function StoneImageInput({
    label = 'Image',
    subLabel = "Use your camera to capture a photo or select one from your device.",
    cloudName = 'lapisgame',
    uploadPreset = 'stones_preset',
    folderPath = 'stones',
    onUpload = () => { },
    initialImage = '',
    className = '',
    disabled,
    error,
    ...props
}) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [imageUrl, setImageUrl] = useState(initialImage);
    const errorRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'lapisgame',
            uploadPreset: 'stones_preset',
            sources: [
                'local',
                'camera',
                'image_search',
            ],

        }, function (error, result) {
            if (error) {
                errorRef.current = error.message;
            }
            if (result) {
                onUpload(result.data.info.files[0].uploadInfo.url)
                setImageUrl(result.data.info.files[0].uploadInfo.url)
            }
        });
    }, []);

    const openWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    return (
        <div className={`flex-1 ${className}`} {...props}>
            <InputLabel htmlFor="stone-image-upload" label={label} subLabel={subLabel} />
            <InputError message={error} className="mt-2" />
            <input
                id="stone-image-upload"
                type="hidden"
                aria-labelledby="stone-image-upload"
                value={imageUrl}
                readOnly
            />
            <button
                type="button"
                onClick={openWidget}
                disabled={disabled}
                className={`block w-full text-sm text-blue-900 border border-blue-300 rounded-lg cursor-pointer bg-blue-50 focus:outline-none p-4 my-8 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <Icon iconName={imageOutline} /> Click here to choose a file or make a picture
            </button>

            {imageUrl && (
                <div className="flex items-center justify-center bg-gray-200 rounded-md h-36 mt-4">
                    <img
                        src={imageUrl}
                        alt="Uploaded Stone Image"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
            )}
        </div>
    );
}
