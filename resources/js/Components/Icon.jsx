import React from 'react';
import { IonIcon } from '@ionic/react'; // Ensure to install @ionic/react and ionicons
import '@ionic/react/css/core.css'; // Basic CSS for Ionicons

/**
 * Icon component that displays an Ionicon with optional text in various configurations.
 *
 * @param {Object} props Component props.
 * @param {boolean} [h1=false] Whether to display an h1 sized text.
 * @param {boolean} [h2=false] Whether to display an h2 sized text.
 * @param {boolean} [h3=false] Whether to display an h3 sized text.
 * @param {boolean} [h4=false] Whether to display an h4 sized text.
 * @param {boolean} [h5=false] Whether to display an h5 sized text.
 * @param {boolean} [p=false] Whether to display a p sized text.
 * @param {boolean} [bold=false] Whether to display the text in bold.
 * @param {boolean} [italic=false] Whether to display the text in italic.
 * @param {string} iconName Name of the icon to be displayed.
 * @param {string} [title] Text to be displayed as a title.
 * @param {number} [size=24] Font size of the icon.
 * @param {string} [iconColor='text-black'] Color of the icon.
 * @param {boolean} [iconShadow=false] Whether to display a shadow around the icon.
 * @param {string} [textColor='text-black'] Color of the text.
 * @param {boolean} [badge=false] Whether to display a badge.
 * @param {string|number} [badgeData] Data to be displayed in the badge.
 * @param {boolean} [bottom=false] Whether to display the title at the bottom of the icon.
 * @param {Object} [style] Additional CSS styles to be applied to the component.
 * @param {Object} [textStyle] Additional CSS styles to be applied to the text.
 * @param {Function} [onClick] Event handler to be called on click.
 * @returns {JSX.Element} The rendered icon with optional text.
 */
 
const Icon = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  iconName,
  title,
  size = 24,
  iconColor = 'text-black',
  iconShadow = false,
  textColor = 'text-black',
  badge = false,
  badgeData = null,
  bottom = false,
  style,
  textStyle,
  onClick
}) => {
  const textSize = h1 ? 'text-4xl'
                  : h2 ? 'text-3xl'
                  : h3 ? 'text-2xl'
                  : h4 ? 'text-xl'
                  : h5 ? 'text-lg'
                  : p ? 'text-base'
                  : 'text-sm';

  const textClasses = `${textSize} ${textColor} ${bold ? 'font-bold' : 'font-normal'} ${italic ? 'italic' : ''}`;
  const iconClasses = `${iconColor} ${size ? `text-${size}` : ''} ${iconShadow ? 'shadow-lg' : ''}`;

  const wrapperClasses = bottom ? 'flex flex-col items-center justify-center' : 'flex items-center justify-center space-x-2';

  return (
    <div className={`${wrapperClasses} cursor-pointer`} onClick={onClick} style={style}>
      {title && !bottom && <span className={textClasses} style={textStyle}>{title}</span>}
      <div className="relative">
        <IonIcon icon={iconName} className={iconClasses} style={{ fontSize: size }} />
        {badge && badgeData !== null && (
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white text-xs px-2 py-1">
            {badgeData}
          </span>
        )}
      </div>
      {title && bottom && <span className={textClasses} style={textStyle}>{title}</span>}
    </div>
  );
};

export default Icon;
