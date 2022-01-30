import { TextArea, TextAreaContainer, TextAreaLable } from './lib';
import * as colors from '../styles/colors';

const TextAreaForm = ({ cols, rows, formLabel, jsonValue, readOnly = false, style }) => {
  return (
    <form className="mt-5">
      <TextAreaContainer className="form-group">
        <TextAreaLable style={{ color: colors.base }}>{formLabel}</TextAreaLable>
        <TextArea readOnly={readOnly} cols={cols} rows={rows} value={jsonValue} />
      </TextAreaContainer>
    </form>
  );
};

export default TextAreaForm;
