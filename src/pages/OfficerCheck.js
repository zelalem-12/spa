import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Meta from '../components/Meta';
import SearchForm from '../components/SearchForm';
import FormattedTable from '../components/Table';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const OfficerCheck = props => {
  const { getAccessTokenSilently } = useAuth0();
  const isAuth = sessionStorage.getItem('authorisedToken');
  const [status, setStatus] = useState({});
  const [officers, setOfficers] = useState([
    { number: '000000', name: 'James Smith', address: 'AD1' },
    { number: '000001', name: 'Edward Jones', address: 'AD2' },
    { number: '100000', name: 'John Adams', address: 'AD2' },
    { number: '800000', name: 'Richard Black', address: 'AD3' },
    { number: '300000', name: 'Thomas Hill', address: 'AD5' },
  ]);
  const [companyNumber] = useState(props.match.params.id);
  const [currentPage, setCurrentPage] = useState(1);
  const API_URL_OFFICERS = `https://w11quc0f1f.execute-api.eu-west-2.amazonaws.com/v1/officers/company-officers?company=${companyNumber}`;
  const pageSize = 20;

  const officersColmuns = [
    { dataField: 'number', text: 'Company ID' },
    { dataField: 'name', text: 'Name' },
    { dataField: 'address', text: 'Address' },
  ];

  if (!isAuth) {
    window.location.href = '/login';
  }

  // eslint-disable-next-line
  const fetchOfficersData = async () => {
    fetch(API_URL_OFFICERS + companyNumber)
      .then(response => response.json())
      .then(data => setOfficers(data.officers));
  };

  useEffect(() => {
    if (companyNumber) {
      // fetchOfficersData()
    }
  }, [companyNumber]);

  useEffect(
    () => {
      (async () => {
        if (companyNumber) {
          try {
            const token = await getAccessTokenSilently({
              audience: '',
              scope: 'read:officers',
            });
            const response = await fetch('', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setOfficers(await response.json());
          } catch (e) {
            console.error(e);
          }
        }
      })();
    },
    // eslint-disable-next-line
    [getAccessTokenSilently],
    companyNumber,
  );

  const pageTitle = 'Officer Check';

  const handleSubmit = e => {
    e.preventDefault();
    setStatus({
      id: 'xx',
      msg: '',
    });
  };

  return (
    <div>
      <Meta title={pageTitle} />
      <h1>{pageTitle}</h1>
      {!props.match.params.id && (
        <SearchForm
          formLabel={'Officer Name'}
          handleSubmit={handleSubmit}
          onAddressSelected={data => setOfficers(data)}
        />
      )}

      {officers.length > 0 && (
        <div className="mt-3">
          <FormattedTable data={officers} columns={officersColmuns} />
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={100}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      )}

      {status.id && status.id === 'xx' && <Loader />}
    </div>
  );
};

export default OfficerCheck;
