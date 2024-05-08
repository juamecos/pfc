import { useEffect, useRef } from 'react';

/**
 * Custom React hook that logs changes in props to the console.
 * 
 * @param {object} props - The props object passed to the component.
 * 
 * @returns {void} This function does not return anything.
 * 
 * @example
 * import React from 'react';
 * import useTraceUpdate from './useTraceUpdate';
 * 
 * function MyComponent({ prop1, prop2 }) {
 *   useTraceUpdate({ prop1, prop2 });
 * 
 *   // Rest of the component code...
 * }
 */
export default function useTraceUpdate(props) {
    const prev = useRef(props);

    useEffect(() => {
        const changedProps = Object.entries(props).reduce((changes, [key, value]) => {
            if (prev.current[key] !== value) {
                changes[key] = [prev.current[key], value];
            }
            return changes;
        }, {});

        if (Object.keys(changedProps).length > 0) {
            console.log('Changed props:', changedProps);
        }

        // Update the previous props to current ones
        prev.current = props;
    });
}
