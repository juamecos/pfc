// LabeledTextInput.js
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from '@/Components/Forms/InputError';
import { forwardRef } from 'react';

/**
 * A React component that wraps a TextInput with an InputLabel.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.htmlFor - The HTML 'for' attribute para el InputLabel.
 * @param {string} props.label - The label text para el InputLabel.
 * @param {string} props.subLabel - The sublabel text para el InputLabel.
 * @param {string} props.id - The HTML 'id' attribute para el TextInput.
 * @param {string} props.name - The HTML 'name' attribute para el TextInput.
 * @param {string} props.value - The current value of the TextInput.
 * @param {function} props.onChange - The callback function to handle changes to el TextInput.
 * @param {string} props.placeholder - The placeholder text para el TextInput.
 * @param {string} [props.type='text'] - The type of the TextInput.
 * @param {boolean} [props.isFocused=false] - Whether el TextInput is currently focused.
 * @param {string} [props.className=''] - Additional CSS classes para el TextInput.
 * @param {Object} props.ref - The React ref para el TextInput.
 * @param {Object} props....props - Additional props to pass to el TextInput.
 *
 * @returns {JSX.Element} - The LabeledTextInput component.
 */
const LabeledTextInput = forwardRef(function LabeledTextInput(
    { htmlFor, label, subLabel, id, name, value, onChange, placeholder, type = 'text', isFocused = false, className = '', error, ...props },
    ref
) {
    return (
        <div className="my-4">
            <InputLabel htmlFor={htmlFor} label={label} subLabel={subLabel} />
            <InputError message={error && error} className="mt-2" />

            <TextInput
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                isFocused={isFocused}
                className={className}
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default LabeledTextInput;
