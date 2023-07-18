import React from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';

const InputSelect = ({ label, options, erro, ...props }) => {

    return (
        <>
            <FormLabel htmlFor={props.field}>{label}</FormLabel>
            <FormControl
                as='select'
                className={`form-control ${erro ? 'is-invalid' : ''}`}
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </FormControl>
            {erro && <FormControl.Feedback type="invalid">Campo obrigatório</FormControl.Feedback>}
        </>
    );
};

export default InputSelect;


















// <label className="form-label">Situação</label>
//             <select
//               id="situacao"
//               value={situacao}
//               onChange={(e) => setSituacao(e.target.value)}
//               className="form-select"
//               disabled
//             >
//               <option value="">Selecione</option>
//               <option value={true}>Ativo</option>
//               <option value={false}>Inativo</option>
//             </select>