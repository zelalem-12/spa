const InputForm = ({ type = 'text', placeholder = '', value, handleChange , inputRef}) => {
  return (
    <div className="form-group mt-3">
      <input ref = {inputRef} type={type} placeholder={placeholder} className="form-control" value={value} onChange={handleChange} />
    </div>
  );
};

export default InputForm;
