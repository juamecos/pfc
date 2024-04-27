import React from 'react';

/**
 * Avatar component that displays an image or a placeholder icon.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.src] - Image source URL for the avatar
 * @param {string} [props.alt="Avatar"] - Alt text for the avatar image
 * @param {boolean} [props.rounded=true] - If true, the avatar will have fully rounded corners
 * @param {Object} [props.rest] - Additional props for accessibility and other attributes
 * @returns {JSX.Element} - The rendered avatar image or icon
 */
const Avatar = ({
  src,
  alt = 'Avatar',
  rounded = true,
  ...rest
}) => {
  const baseClass = 'w-10 h-10 m-2'; // Base width and height
  const responsiveClass = 'sm:w-12 sm:h-12 md:w-14 md:h-14'; // Responsive width and height
  const shapeClass = rounded ? 'rounded-full' : 'rounded';

  if (!src) {
    // Placeholder logic, add a suitable placeholder if src is not provided
    return (
      <div className={`${baseClass} ${responsiveClass} ${shapeClass} bg-gray-300 flex items-center justify-center`} {...rest}>
        <span className="text-xl text-white">?</span> {/* Placeholder icon */}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClass} ${responsiveClass} ${shapeClass} object-cover`}
      {...rest}
    />
  );
};

export default Avatar;