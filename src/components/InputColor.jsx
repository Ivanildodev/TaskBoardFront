import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
import { ChromePicker } from 'react-color';

const InputColor = ({ label, erro, onChange, ...props }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [inputValue, setInputValue] = useState(props.value);

    const handleColorChange = (color) => {
        const newValue = color.hex;
        setInputValue(newValue);
        onChange(newValue);
    };

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    return (
        <>
            <FormLabel htmlFor={props.id}>{label}</FormLabel>
            <div style={{ position: 'relative' }}>
                <FormControl
                    onClick={toggleColorPicker}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    {...props}
                />
                {erro && <FormControl.Feedback type="invalid">Campo obrigatório</FormControl.Feedback>}
                {showColorPicker && !props.disable && (
                    <div style={{ position: 'absolute', zIndex: 1 }}>
                        <ChromePicker color={props.value} onChange={handleColorChange} />
                    </div>
                )}
            </div>
        </>
    );
};

export default InputColor;
