/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaSearch, FaTimes } from 'react-icons/fa';
import * as colors from 'styles/colors';
import { useAnalyseName } from 'hooks/useNameSearch';
import { Spinner, Input } from 'components/lib';
import Meta from 'components/Meta';

function AnalyseName() {
  const pageTitle = 'Analyse Name';

  const [query, setQuery] = useState({
    name: 'Mr|Alan||Walker|',
    dob: '1981-07-21',
  });
  const [queried, setQueried] = useState();
  const { data, error, isLoading, isError } = useAnalyseName(query);

  function handleSearchClick(event) {
    event.preventDefault();

    if (event.target.elements.name.value && event.target.elements.dob.value) {
      setQueried(true);
      setQuery({
        name: event.target.elements.name.value,
        dob: event.target.elements.dob.value,
      });
    }
  }

  return (
    <div>
      <div>
        <Meta title={pageTitle} />
        <h1>{pageTitle}</h1>
        <form onSubmit={handleSearchClick}>
          <Input placeholder="Date of birth YYYY-MM-DD" id="dob" type="search" css={{ width: '50%' }} />
          <Input placeholder="Name" id="name" type="search" css={{ width: '50%' }} />
          <label htmlFor="name">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{ color: colors.danger }} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </form>

        {isError ? (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {data ? (
          <Table striped bordered hover size="sm">
            <tbody>
              {Object.keys(data).map(value => {
                return (
                  <tr key={value}>
                    <th>{value}</th>
                    <td css={{ maxWidth: 700, overflow: 'auto' }}>{data[value]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : queried ? (
          <div css={{ marginTop: 20, fontSize: '1.2em', textAlign: 'center' }}>
            {isLoading ? (
              <div css={{ width: '100%', margin: 'auto' }}>
                <Spinner />
              </div>
            ) : (
              <p>Couldn't find any names with the query "{query}." Please try another.</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AnalyseName;
