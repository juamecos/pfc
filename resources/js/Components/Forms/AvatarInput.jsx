import React, { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/Forms/InputLabel';
import InputError from '@/Components/Forms/InputError';
import Icon from '@/Components/Icon';
import { cameraOutline } from 'ionicons/icons';

/**
 * A custom React component for uploading a user avatar.
 * @param {Object} props - The component's props.
 * @param {string} [props.label] - The label text for the input.
 * @param {string} [props.subLabel] - The sublabel text for the input.
 * @param {string} [props.cloudName] - The Cloudinary account's cloud name.
 * @param {string} [props.uploadPreset] - The Cloudinary upload preset for avatars.
 * @param {string} [props.folderPath='avatars'] - The Cloudinary folder path for avatar uploads.
 * @param {Function} [props.onUpload] - Callback function when the avatar is successfully uploaded.
 * @param {string} [props.initialImage=''] - Initial avatar URL.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @param {boolean} [props.disabled=false] - Disable the upload button.
 * @param {string} [props.error=''] - Error message to display.
 * @returns {JSX.Element} - The rendered AvatarInput component.
 */
export default function AvatarInput({
    label = 'Avatar',
    subLabel = "Upload your profile picture from your device or take a new photo.",
    cloudName = 'lapisgame',
    uploadPreset = 'avatar_preset',
    folderPath = 'avatars',
    onUpload = () => { },
    initialImage = '',
    className = '',
    disabled = false,
    error = '',
    ...props
}) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [imageUrl, setImageUrl] = useState(initialImage);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            sources: ['local', 'camera'],
            folder: folderPath,
            cropping: true, // Allow users to crop their avatar
            croppingAspectRatio: 1, // Enforce a square aspect ratio
            clientAllowedFormats: ['jpeg', 'png', 'gif'], // Allowed image formats
        }, (error, result) => {
            if (error) {
                console.error('Upload Error:', error);
                return;
            }
            if (result.event === 'success') {
                onUpload(result.info.url);
                setImageUrl(result.info.url);
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
            <InputLabel htmlFor="avatar-image-upload" label={label} subLabel={subLabel} />
            <InputError message={error} className="mt-2" />
            <button
                type="button"
                onClick={openWidget}
                disabled={disabled}
                className={`block w-full text-sm text-blue-900 border border-blue-300 rounded-lg cursor-pointer bg-blue-50 focus:outline-none p-4 my-8 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <Icon iconName={cameraOutline} /> Click here to choose a file or take a photo
            </button>

            {imageUrl && (
                <div className="flex items-center justify-center bg-gray-200 rounded-md h-36 mt-4">
                    <img
                        src={imageUrl}
                        alt="Uploaded Avatar"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
            )}
        </div>
    );
}
