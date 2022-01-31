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
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group mt-3 border-0">
          <input
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
