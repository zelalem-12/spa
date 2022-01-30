import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Meta from '../components/Meta';
import SearchForm from '../components/SearchForm';
import Loader from '../components/Loader';

const ValidateAddress = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [status, setStatus] = useState({});
  const [address, setAddress] = useState({
    line_1: '',
    line_2: '',
    line_3: '',
    post_town: '',
    postcode: '',
  });

  const pageTitle = 'Validate Address';

  const newSearch = () => {
    window.location.reload();
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus({
      id: 'xx',
      msg: '',
    });
  };

  useEffect(
    () => {
      (async () => {
        if (status.id !== 'xx') {
          try {
            const token = await getAccessTokenSilently({
              audience: '',
              scope: 'read:address',
            });
            const response = await fetch('', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setAddress(await response.json());
          } catch (e) {
            console.error(e);
          }
        }
      })();
    },
    // eslint-disable-next-line
    [getAccessTokenSilently],
    status,
  );

  return (
    <div>
      <Meta title={pageTitle} />
      <h1>{pageTitle}</h1>
      <SearchForm
        formLabel={'Address'}
        handleSubmit={handleSubmit}
        onAddressSelected={address => setAddress(address)}
      />
      {status.id && status.id === 'xx' && <Loader />}

      {status.id && status.id !== 'xx' && (
        <div className="mt-3">
          <span>{`${status.id}: ${status.msg}`}</span>
        </div>
      )}
      {address.postcode && (
        <>
          <span className="btn btn-primary mt-3" onClick={newSearch}>
            New Search
          </span>
          <form className="mt-5">
            <div class="form-group">
              <label>Address Line One</label>
              <input
                maxLength={'60'}
                type="text"
                value={address.line_1}
                className="form-control"
                disabled
                onChange={e => setAddress({ ...address, line_1: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Address Line Two</label>
              <input
                maxLength={'60'}
                type="text"
                value={address.line_2}
                className="form-control"
                disabled
                onChange={e => setAddress({ ...address, line_2: e.target.value })}
              />
            </div>
            <div class="form-group">
              <label>Address Line Three</label>
              <input
                maxLength={'60'}
                type="text"
                value={address.line_3}
                className="form-control"
                disabled
                onChange={e => setAddress({ ...address, line_3: e.target.value })}
              />
            </div>
            <div class="form-group">
              <label>Post Town</label>
              <input
                maxLength={'60'}
                type="text"
                value={address.post_town}
                className="form-control"
                disabled
                onChange={e => setAddress({ ...address, post_town: e.target.value })}
              />
            </div>
            <div class="form-group">
              <label>Postcode</label>
              <input
                maxLength={'60'}
                type="text"
                value={address.postcode}
                className="form-control"
                disabled
                onChange={e => setAddress({ ...address, postcode: e.target.value })}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ValidateAddress;
