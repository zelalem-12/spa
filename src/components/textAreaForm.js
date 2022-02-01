/** @jsxImportSource @emotion/react */
import { TextArea, TextAreaContainer } from './lib';

const TextAreaForm = ({ cols, rows, placeholder = '', jsonValue, readOnly = false, style }) => {
  return (
    <form>
      <TextAreaContainer>
        <TextArea
          placeholder={placeholder.toUpperCase()}
          readOnly={readOnly}
          cols={cols}
          rows={rows}
          value={jsonValue}
        />
      </TextAreaContainer>
    </form>
  );
};

export default TextAreaForm;
