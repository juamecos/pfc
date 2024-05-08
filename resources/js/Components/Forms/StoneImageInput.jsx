// Components/Forms/StoneImageInput.js
import React, { useEffect, useRef } from 'react';
import useCloudinaryUpload from '@/hooks/useCloudinaryUpload';
import InputLabel from '@/Components/Forms/InputLabel';


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
    subLabel = "Add an image of the stone here. Don't forget to add the name of the photographer if you haven't taken this yourself.",
    cloudName = 'lapisgame',
    uploadPreset = 'stones_preset',
    folderPath = 'stones',
    onUpload = () => { },
    className = '',
    ...props
}) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
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
            }
        });
    }, []);

    return (
        <div className={`flex-1 ${className}`} {...props}>
            <InputLabel label={label} subLabel={subLabel} />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center justify-center bg-gray-200 rounded-md h-36">
                    <div className="w-full h-full">
                        <button
                            type="button"
                            onClick={() => widgetRef.current.open()}
                            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"

                        >

                            <div className="text-center text-sm text-gray-600">
                                Choose a file or make a picture
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            {/* {error && <p className="mt-2 text-red-600 text-sm">{error}</p>} */}
        </div>
    );
}
