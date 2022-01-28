import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Meta from '../components/Meta';
import SearchForm from '../components/SearchForm';
import FormattedTable from '../components/Table';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const CompanyCheck = () => {
  const { getAccessTokenSilently } = useAuth0();
  const isAuth = sessionStorage.getItem('authorisedToken');
  const [status, setStatus] = useState({});
  const [search, setSearch] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [company, setCompany] = useState([
    { number: '000000', name: 'Test 1', address: 'AD1', status: 'Active' },
    { number: '000001', name: 'Test 2', address: 'AD2', status: 'Active' },
    { number: '100000', name: 'Zebra Crossing', address: 'AD2', status: 'Dissolved' },
    { number: '800000', name: 'Skynet', address: 'AD3', status: 'Active' },
    { number: '300000', name: 'BT', address: 'AD5', status: 'Dissolved' },
  ]);
  const pageSize = 20;

  // const [officers, setOfficers] = useState([]);
  const API_URL_COMPANY = `https://w11quc0f1f.execute-api.eu-west-2.amazonaws.com/v1/companies/info?id=${search}&limit=${pageSize}&offset=${currentPage}`;
  // const API_URL_OFFICERS = `https://w11quc0f1f.execute-api.eu-west-2.amazonaws.com/v1/officers/company-officers?company=`;

  useEffect(() => {
    if (company.length > 0) {
      // fetchOfficersData()
    }
  }, [company]);

  useEffect(() => {
    // fetchCompanyData()
  }, [currentPage]);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: '',
          scope: 'read:company',
        });
        const response = await fetch('', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompany(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  const fetchCompanyData = async () => {
    fetch(API_URL_COMPANY)
      .then(response => response.json())
      .then(data => setCompany(data.company.info[0]));
  };

  if (!isAuth) {
    window.location.href = '/login';
  }

  const companyColumns = [
    { dataField: 'number', text: 'ID' },
    { dataField: 'name', text: 'Name' },
    { dataField: 'address', text: 'Address' },
    { dataField: 'status', text: 'Status' },
  ];

  const pageTitle = 'Company Check';

  const handleSubmit = e => {
    e.preventDefault();
    fetchCompanyData();
    setStatus({
      id: 'xx',
      msg: '',
    });
  };

  return (
    <div>
      <Meta title={pageTitle} />
      <h1>{pageTitle}</h1>
      <SearchForm
        maxlength="80"
        formLabel={'Company Name'}
        handleSubmit={handleSubmit}
        onSearchEntry={data => setSearch(data)}
      />

      {status.id && status.id === 'xx' && <Loader />}

      {company.length > 0 && (
        <div className="mt-3">
          <FormattedTable
            data={company}
            columns={companyColumns}
            showLink
            showLinkText="View Officers"
            showLinkAction="/officer-check"
          />
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={100}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyCheck;
