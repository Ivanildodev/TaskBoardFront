import React from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
import InputMask from 'react-input-mask'

const Input = ({ label, erro, ...props }) => {
    return (
        <>
            <FormLabel htmlFor={props.id}>{label}</FormLabel>
            {
                props.type === 'phone' ? <InputMask
                    mask="(99) 9 9999-9999"
                    className={`form-control ${erro ? 'is-invalid' : ''}`}
                    {...props}
                >
                    {(inputProps) => (
                        <FormControl
                            {...inputProps}
                            type="tel"
                        />
                    )}
                </InputMask> : 
                <FormControl
                    className={`form-control ${erro ? 'is-invalid' : ''}`}
                    {...props}
                />
            }

            {erro && <FormControl.Feedback type="invalid">Campo obrigatório</FormControl.Feedback>}
        </>
    );
};

export default Input;
