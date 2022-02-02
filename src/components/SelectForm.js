/** @jsxImportSource @emotion/react */
import * as colors from 'styles/colors';
const SelectFrom = ({ value, handleChange }) => {
  return (
    <div>
      <select
        css={{
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '2px',
          padding: '12px 12px',
          width: '100%',
          opacity: '-moz-initial0.8',
          color: colors.base,
          appearance: 'none',
          ':focus': {
            background: 'rgba(255, 255, 255, 0.2)',
            color: colors.base,
            boxShadow: 'none',
            outlineStyle: 'none',
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
      <i
        css={{
          border: `solid ${colors.base}`,
          borderWidth: '0 3px 3px 0',
          float: 'right',
          padding: '4px',
          marginRight: '1.0rem',
          transform: 'rotate(45deg)',
          '-webkit-transform': 'rotate(45deg)',
          position: 'relative',
          top: '-2.2rem',
        }}
        class="arrow right"
      ></i>
    </div>
  );
};
export default SelectFrom;
