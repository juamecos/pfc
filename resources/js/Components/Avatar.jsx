import React from 'react';

/**
 * Avatar component that displays an image or a placeholder icon.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.src] - Image source URL for the avatar
 * @param {string} [props.alt="Avatar"] - Alt text for the avatar image
 * @param {boolean} [props.rounded=true] - If true, the avatar tendrá esquinas completamente redondeadas
 * @param {string} [props.size="md"] - Tamaño del avatar (xs, sm, md, lg, xl)
 * @param {Object} [props.rest] - Additional props for accessibility and other attributes
 * @returns {JSX.Element} - The rendered avatar image or icon
 */
const Avatar = ({
  src,
  alt = 'Avatar',
  rounded = true,
  size = 'md',
  ...rest
}) => {
  const shapeClass = rounded ? 'rounded-full' : 'rounded';

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses['md'];

  if (!src) {
    // Placeholder logic, add a suitable placeholder if src is not provided
    return (
      <div className={`${selectedSizeClass} ${shapeClass} bg-gray-300 flex items-center justify-center`} {...rest}>
        <span className="text-xl text-white">?</span> {/* Placeholder icon */}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${selectedSizeClass} ${shapeClass} object-cover`}
      {...rest}
    />
  );
};

export default Avatar;
