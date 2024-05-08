// TextInput.js
import { forwardRef, useEffect, useRef } from 'react';

/**
 * A custom React component for rendering a text input field.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.id - The id attribute of the input field.
 * @param {string} props.name - The name attribute of the input field.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.onChange - The event handler para el change event.
 * @param {string} props.placeholder - The placeholder text para el input field.
 * @param {string} [props.type='text'] - The type of the input field.
 * @param {string} [props.className=''] - Additional CSS classes para el input field.
 * @param {boolean} [props.isFocused=false] - Whether the input field should be focused.
 * @param {Object} props.ref - The ref object para el input field.
 * @param {Object} props.props - Additional props to be spread onto the input field.
 *
 * @returns {JSX.Element} - The rendered text input field.
 */
export default forwardRef(function TextInput(
    { id, name, value, onChange, placeholder, type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-input block w-full rounded-md border border-gray-300 focus:border-blue-500 flex-1 px-3 ${className}`}
            ref={input}
            {...props}
        />
    );
});
