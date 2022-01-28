import { useState } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';

const Login = () => {
  // page content
  const pageTitle = 'Login';
  const auth = 'nextcloud';
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const loginForm = e => {
    e.preventDefault();
    if (password === auth) {
      setError('');
      sessionStorage.setItem('authorisedToken', true);
      window.location.href = '/';
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} />

      <p className="text-danger">{error}</p>
      <form onSubmit={loginForm}>
        <div className="form-group">
          <label>Enter password to continue</label>
          <input
            maxlength="80"
            type="text"
            value={password}
            className="form-control"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-2">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
