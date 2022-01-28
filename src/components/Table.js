import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';

const FormattedTable = ({ data, columns, showLink, showLinkText, showLinkAction }) => {
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map(record => (
              <th>{record.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr>
              <td>{record.number}</td>
              <td>{record.name}</td>
              <td>{record.address}</td>
              {record.status && <td>{record.status}</td>}
              {showLink && (
                <td>
                  <Link
                    to={`${showLinkAction}/${record.number}`}
                    className="d-flex align-items-center col-md-8 mb-2 mb-md-0 text-dark text-decoration-none"
                  >
                    <button type="button" className="btn btn-outline-primary">
                      {showLinkText}
                    </button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FormattedTable;
