import React from 'react';
import { CustomInput } from 'components/lib';
const InputDateForm = ({ type = 'text', placeholder = '', value, handleChange, handleKeyEvent }) => {
  return (
    <div className="form-group mt-3">
      <CustomInput
        maxLength="80"
        type="text"
        placeholder={placeholder}
        className="form-control"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyEvent}
      />
    </div>
  );
};

export default InputDateForm;
