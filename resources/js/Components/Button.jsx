/**
 * Button component renders a customizable and reusable button with optional icons and loading states.
 * 
 * @param {object} props - Properties passed to the button component.
 * @param {React.ReactNode} props.children - Content to be displayed inside the button.
 * @param {Function} props.onClick - Handler for click events on the button.
 * @param {string} [props.buttonType='default'] - Defines the button style type.
 * @param {string} [props.size='md'] - Defines the size of the button (sm, md, lg).
 * @param {boolean} [props.disabled=false] - If true, the button will be disabled.
 * @param {boolean} [props.loading=false] - If true, displays a loading indicator.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the button.
 * @param {React.ElementType} [props.icon] - Optional icon to display in the button.
 * @param {string} [props.iconPosition='left'] - Position of the icon relative to the text (left, right).
 * @returns {JSX.Element} The rendered button element.
 */
export default function Button({
  children,
  onClick,
  buttonType = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon: Icon,
  iconPosition = 'left'
}) {
  // Base styles applied to all buttons
  const baseStyle = 'active:outline focus:outline-none font-medium rounded-full text-center text-sm px-5 py-2.5 mb-2 transition ease-in-out duration-150';

  // Size options for the button
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-xl px-7 py-3'
  };

  // Style types for the button
  const types = {
    default: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
    alternative: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
    light: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
    green: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:hover:bg-green-700 dark:focus:ring-green-800',
    red: 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:hover:bg-red-700 dark:focus:ring-red-900',
    yellow: 'bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900',
    purple: 'bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
  };

  // Build the full class name for the button
  const buttonClassName = `${baseStyle} ${sizes[size]} ${types[buttonType]} ${className}`;

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : 'false'}
      aria-disabled={disabled || loading ? 'true' : 'false'}
    >
      {loading ? (
        <span>Loading...</span> // Consider using a spinner or loading icon here
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="ml-2 h-5 w-5" aria-hidden="true" />}
        </>
      )}
    </button>
  );
}
