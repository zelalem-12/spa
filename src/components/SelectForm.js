/** @jsxImportSource @emotion/react */
import { Form } from 'react-bootstrap';
import * as colors from 'styles/colors';
const SelectFrom = ({ value, handleChange }) => (
  <div>
    <Form.Select
      css={{
        background: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: 'none',
        borderRadius: '0px',
        marginBottom: '10px',
        color: colors.gray10,
        opacity: '-moz-initial0.8',
        '::placeholder': {
          color: colors.gray10
        }
      }}
      value={value} onChange={handleChange}>
      <option value={''}>Gender</option>
      <option value={'MALE'}>Male</option>
      <option value={'FEMALE'}>Female</option>
    </Form.Select>
  </div>
);
export default SelectFrom;
