import { TextArea, TextAreaContainer } from './lib';

const TextAreaForm = ({ cols, rows, formLabel, jsonValue, readOnly = false, style }) => {
  return (
    <form className="mt-5">
      <TextAreaContainer className="form-group">
        <label>
          <strong>{formLabel}</strong>
        </label>
        <TextArea readOnly={readOnly} cols={cols} rows={rows} value={jsonValue} />
      </TextAreaContainer>
    </form>
  );
};

export default TextAreaForm;
