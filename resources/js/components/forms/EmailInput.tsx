import React from 'react';
import TextInput from './TextInput';

type EmailInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
    id: string;
    label?: string;
    error?: string;
    help?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
};

/**
 * @todo email validation feedback ?
 **/

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(function EmailInput(
    props,
    ref
) {
    return <TextInput {...props} ref={ref} type="email" />;
});

export default EmailInput;