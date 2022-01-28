import React from 'react';

const InputDateForm = ({ type = 'text', placeholder = '', value, handleChange, handleKeyEvent }) => {
  return (
    <div className="form-group mt-3">
      <input
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
