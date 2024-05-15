export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-red-600 ' + className} role="alert">
            {message}
        </p>
    ) : null;
}
