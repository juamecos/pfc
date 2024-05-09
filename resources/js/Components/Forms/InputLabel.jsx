/**
 * Renders an input label component.
 * @param {string} htmlFor - The id of the input element that the label is associated with.
 * @param {string} [label] - The label text.
 * @param {string} [subLabel] - The sublabel text.
 * @param {string} [value] - The value of the input element.
 * @param {string} [className] - The class name of the component.
 * @param {ReactNode} [children] - The child elements of the component.
 * @param {Object} [props] - The props of the component.
 * @returns {JSX.Element} The input label component.
 */
export default function InputLabel({
    htmlFor,
    label,
    subLabel,
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <div className={`mb-2 ${className}`} {...props}>
            {label || value ? (
                <label htmlFor={htmlFor} className="block font-medium text-lg text-gray-900">
                    {label || value}
                </label>
            ) : (
                children
            )}
            {subLabel && <span className="block text-gray-500 text-sm mt-1">{subLabel}</span>}
        </div>
    );
}

