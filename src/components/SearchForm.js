import { useState } from 'react';

const SearchForm = ({ handleSubmit, formLabel, onSearchEntry }) => {
  const [search, setSearch] = useState('');

  const handleSearch = criteria => {
    setSearch(criteria);
    onSearchEntry(criteria);
  };

  return (
    <>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{formLabel}</label>
          <input
            maxlength="60"
            type="text"
            value={search}
            className="form-control"
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-2">Search</button>
      </form>
    </>
  );
};

export default SearchForm;
