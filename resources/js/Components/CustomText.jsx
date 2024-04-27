import React from 'react';

/**
 * Text component for displaying styled text with various heading levels, bold, italic, and other styles.
 * It also allows for text break control and dynamic margin adjustment using Tailwind CSS.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.h1] - If true, styles the text as h1.
 * @param {boolean} [props.h2] - If true, styles the text as h2.
 * @param {boolean} [props.h3] - If true, styles the text as h3.
 * @param {boolean} [props.h4] - If true, styles the text as h4.
 * @param {boolean} [props.h5] - If true, styles the text as h5.
 * @param {boolean} [props.p] - If true, styles the text as paragraph.
 * @param {boolean} [props.bold] - If true, applies bold styling.
 * @param {boolean} [props.italic] - If true, applies italic styling.
 * @param {string} props.title - The text content to display.
 * @param {string} [props.textColor='text-gray-900'] - Text color using Tailwind classes.
 * @param {string} [props.textShadow] - Text shadow using Tailwind classes.
 * @param {string} [props.textBreak='normal'] - Control how text breaks (normal, words, all).
 * @param {string} [props.margin] - Margin around the text using Tailwind margin classes.
 * @param {Object} [props.rest] - Additional props for accessibility and other attributes.
 * @returns {JSX.Element}
 */
export default function CustomText({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  title,
  textColor = 'text-gray-900',
  textShadow,
  textBreak = 'normal', // Default to 'normal' which does not force breaks
  margin = '', // Default to no additional margin
  ...rest
}) {
  const Tag = h1 ? 'h1' :
    h2 ? 'h2' :
      h3 ? 'h3' :
        h4 ? 'h4' :
          h5 ? 'h5' :
            p ? 'p' : 'span'; // Default to span if no matching prop

  const textSize = h1 ? 'text-4xl md:text-6xl'
    : h2 ? 'text-3xl md:text-5xl'
      : h3 ? 'text-2xl md:text-4xl'
        : h4 ? 'text-xl md:text-3xl'
          : h5 ? 'text-lg md:text-2xl'
            : p ? 'text-base md:text-lg'
              : 'text-sm md:text-base';

  // Generate class names dynamically
  const classNames = [
    textSize,
    textColor,
    textShadow,
    bold ? 'font-bold' : '',
    italic ? 'italic' : '',
    margin, // Add margin class to the class list
    {
      'break-normal': textBreak === 'normal',
      'break-words': textBreak === 'words',
      'break-all': textBreak === 'all'
    }
  ].join(' ').trim();

  // Return the component with dynamic tag and classes
  return (
    <Tag className={classNames} {...rest}>
      {title}
    </Tag>
  );
};
