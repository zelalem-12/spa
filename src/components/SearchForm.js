/** @jsxImportSource @emotion/react */
import * as colors from 'styles/colors';
import { useState } from 'react';
import { LoadingButton, Loader } from 'components/lib';
const SearchForm = ({ handleSubmit, onSearchEntry, placeholder = '', statusID }) => {
  const [search, setSearch] = useState('');

  const handleSearch = criteria => {
    setSearch(criteria);
    onSearchEntry(criteria);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input  css={{
            background: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: 'none',
            marginBottom: '16px',
            padding: '12px 12px',
            borderRadius: '5px',

            color: colors.base,
            ':focus': {
              background: 'rgba(255, 255, 255, 0.2)',
              color: colors.base,
              boxShadow: 'none',
            },

            '::placeholder': {
              color: colors.gray10,
            },
          }}
            maxLength="60"
            type="text"
            value={search}
            className="form-control"
            placeholder={placeholder}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
        <div className="col-md-12 text-center">
          <LoadingButton type="submit">{statusID === 'xx' ? <Loader /> : 'Submit'}</LoadingButton>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
