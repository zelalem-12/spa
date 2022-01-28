const InputForm = ({ type = 'text', placeholder = '', value, handleChange }) => {
  return (
    <div className="form-group mt-3">
      <input
        maxlength="80"
        type={type}
        placeholder={placeholder}
        className="form-control"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputForm;
