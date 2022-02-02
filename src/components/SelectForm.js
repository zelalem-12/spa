/** @jsxImportSource @emotion/react */
import { Form } from 'react-bootstrap';
import * as colors from 'styles/colors';
const SelectFrom = ({ value, handleChange }) => {
  return (
    <div>
      <Form.Select
        css={{
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: 'none',
          borderRadius: '0px',
          marginBottom: '2px',
          padding: '11px 10px',

          opacity: '-moz-initial0.8',
          color: colors.base,
          ':focus': {
            background: 'rgba(255, 255, 255, 0.2)',
            color: colors.base,
            boxShadow: 'none'
          },
          '::placeholder': {
            color: colors.gray10,
          },
          '& option': {
            color: colors.base,
            background: 'rgb(178, 56, 107, 0.7)',

            ':hover':{
              boxShadow:' 0 0 10px 100px #222 inset'
            }
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <option value={''}>Gender</option>
        <option value={'MALE'}>Male</option>
        <option value={'FEMALE'}>Female</option>
      </Form.Select>
    </div>
  );
};
export default SelectFrom;
