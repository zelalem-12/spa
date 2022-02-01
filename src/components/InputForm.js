import { CustomInput } from 'components/lib';
const InputForm = ({ type = 'text', placeholder = '', value, handleChange, inputRef }) => {
  return (
    <div>
      <CustomInput
        maxLength="80"
        ref={inputRef}
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
