// hooks/useCloudinaryUpload.js
import { useEffect, useRef, useState } from 'react';

/**
 * A custom hook to manage the Cloudinary Upload Widget.
 *
 * @param {string} cloudName - The name of your Cloudinary cloud.
 * @param {string} uploadPreset - The upload preset you created in Cloudinary.
 * @param {Array<string>} sources - List of allowed upload sources (default: ['local', 'camera']).
 * @returns {Object} An object containing the widget functions and state variables.
 */
const useCloudinaryUpload = (cloudName = 'lapisgame', uploadPreset = 'stones_preset', sources = ['local', 'camera']) => {
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);
    const [url, setUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const createWidget = () => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName,
                uploadPreset,
                sources,
                multiple: false, // Allow only one image upload
                maxFiles: 1,     // Maximum of one file
            },
            (err, result) => {
                if (err) {
                    setError(`Error uploading image: ${err.message}`);
                    setUploading(false);
                } else if (result.event === 'success') {
                    setUrl(result.info.secure_url);
                    setUploading(false);
                }
            }
        );
    };

    useEffect(() => {
        createWidget();
    }, []);

    const openWidget = () => {
        setUploading(true);
        setError('');
        widgetRef.current.open();
    };

    return {
        openWidget,
        uploading,
        error,
        url,
    };
};

export default useCloudinaryUpload;
