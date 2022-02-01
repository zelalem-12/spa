import React from 'react';
import { CustomInput } from 'components/lib';
const InputDateForm = ({ placeholder = '', value, handleChange, handleKeyEvent, handleBlur, focusHandle }) => {
  return (
    <div >
      <CustomInput
        maxLength="80"
        type="text"
        placeholder={placeholder}
        className="form-control"
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyEvent}
        onFocus={focusHandle}
      />
    </div>
  );
};

export default InputDateForm;
