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

export default function EmailInput(props: EmailInputProps) {
    return <TextInput {...props} type="email" />;
}