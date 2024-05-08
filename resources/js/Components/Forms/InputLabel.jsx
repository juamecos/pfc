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
export default function InputLabel({ htmlFor, label, subLabel, value, className = '', children, ...props }) {
    return (
        <label htmlFor={htmlFor} {...props} className={`block font-medium text-sm text-gray-700 m${className}`}>
            {label || value ? (
                <>
                    <p className="font-bold text-lg flex items-center ">{label || value}</p>
                    {subLabel && <p className="text-gray-500 text-base mb-2">{subLabel}</p>}
                </>
            ) : (
                children
            )}
        </label>
    );
}
