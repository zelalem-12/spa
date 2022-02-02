/** @jsxImportSource @emotion/react */
import { Form } from 'react-bootstrap';
import * as colors from 'styles/colors';
const SelectFrom = ({ value, handleChange }) => {
  return (
  
      <select
        css={{
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: 'none',
          borderRadius: '0px',
          marginBottom: '2px',
          padding: '12px 12px',
          width:'100%',

          opacity: '-moz-initial0.8',
          color: colors.base,
          ':focus': {
            background: 'rgba(255, 255, 255, 0.2)',
            color: colors.base,
            boxShadow: 'none',
            outlineStyle: 'none'
          },
          '::placeholder': {
            color: colors.gray10,
          },
 
          '& option': {
            color: colors.base,
            background: 'rgb(178, 56, 107, 0.7)',
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <option value={''}>Gender</option>
        <option value={'MALE'}>Male</option>
        <option value={'FEMALE'}>Female</option>
      </select>
    
  );
};
export default SelectFrom;
