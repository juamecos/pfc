import React from 'react';
import { format, isValid } from 'date-fns';

/**
 * FormattedTime component that displays a formatted time string.
 *
 * @param {Object} props - Component props
 * @param {string} props.dateTime - The date/time string a formatear
 * @param {string} [props.titleFormat='PPpp'] - Format string para el atributo title
 * @param {string} [props.displayFormat='MMM. d, yyyy'] - Format string para el tiempo mostrado
 * @param {string} [props.className='text-sm text-gray-600'] - Tailwind classes para el estilo del texto
 * @param {Object} [props.rest] - Additional props para el elemento time
 * @returns {JSX.Element} - Formatted time component
 */
const FormattedTime = ({
    dateTime,
    titleFormat = 'PPpp',
    displayFormat = 'MMM. d, yyyy',
    className = 'text-sm text-gray-600',
    ...rest
}) => {
    // Convertir el valor a un objeto Date
    const parsedDate = new Date(dateTime);

    // Validar si el valor es una fecha válida
    if (!isValid(parsedDate)) {
        console.error(`Invalid date passed to FormattedTime: ${dateTime}`);
        return null;
    }

    const formattedTitle = format(parsedDate, titleFormat);
    const formattedDisplay = format(parsedDate, displayFormat);

    return (
        <p className={className}>
            <time dateTime={dateTime} title={formattedTitle} {...rest}>
                {formattedDisplay}
            </time>
        </p>
    );
};

export default FormattedTime;
