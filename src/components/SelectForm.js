import { Form } from 'react-bootstrap';
const SelectFrom = ({ value, handleChange }) => (
  <div className="form-group mt-3">
    <Form.Select size="sm" value={value} onChange={handleChange}>
      <option value={''}>Gender</option>
      <option value={'MALE'}>Male</option>
      <option value={'FEMALE'}>Female</option>
    </Form.Select>
  </div>
);
export default SelectFrom;
