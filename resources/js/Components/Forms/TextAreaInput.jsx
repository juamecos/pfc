import { forwardRef, useEffect, useRef } from 'react';
import InputLabel from '@/Components/Forms/InputLabel';

/**
 * A custom React component for rendering a text area field with a label.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.id - The id attribute of the text area field.
 * @param {string} props.name - The name attribute of the text area field.
 * @param {string} props.value - The value of the text area field.
 * @param {function} props.onChange - The event handler for the change event.
 * @param {string} props.placeholder - The placeholder text for the text area field.
 * @param {string} [props.label] - The label text.
 * @param {string} [props.subLabel] - The sublabel text.
 * @param {number} [props.rows=4] - The number of rows in the text area.
 * @param {string} [props.className=''] - Additional CSS classes for the text area field.
 * @param {boolean} [props.isFocused=false] - Whether the text area should be focused.
 * @param {Object} props.ref - The ref object for the text area field.
 * @param {Object} props.props - Additional props to be spread onto the text area field.
 *
 * @returns {JSX.Element} - The rendered text area field.
 */
export default forwardRef(function TextAreaInput(
    { id, name, value, onChange, placeholder, label, subLabel, rows = 4, className = '', isFocused = false, ...props },
    ref
) {
    const textArea = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textArea.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="my-4">
            <InputLabel htmlFor={id} label={label} subLabel={subLabel} />
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`form-textarea block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm px-3 py-2 ${className}`}
                ref={textArea}
                {...props}
            />
        </div>
    );
});
