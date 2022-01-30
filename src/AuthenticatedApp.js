/** @jsxImportSource @emotion/react */

import { Routes, Route, Link as RouterLink, useMatch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, ErrorMessage, FullPageErrorFallback } from 'components/lib';
import * as mq from 'styles/media-queries';
import * as colors from 'styles/colors';
import { useAuth } from 'context/AuthContext';

// Pages
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import CompanyCheck from 'pages/CompanyCheck';
import OfficerCheck from 'pages/OfficerCheck';
import ValidateAddress from 'pages/ValidateAddress';
import AnalyseName from 'pages/AnalyseName';
import ValidateDlN from 'pages/ValildateDLN';

function ErrorFallback({ error }) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}

function AuthenticatedApp() {
  const { user, logout } = useAuth();
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: colors.base,
        }}
      >
        {user.username}
        <Button variant="secondary" css={{ marginLeft: '10px' }} onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{ position: 'relative' }}>
          <Nav />
        </div>
        <main css={{ width: '100%' }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

function NavLink(props) {
  const match = useMatch(props.to);
  return (
    <RouterLink
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.base,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          ':hover,:focus': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              ':hover,:focus': {
                background: colors.gray10,
                borderLeft: '5px solid transparent',
              },
            }
          : null,
      ]}
      {...props}
    />
  );
}

function Nav() {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/company-check">Company Check</NavLink>
        </li>
        <li>
          <NavLink to="/officer-check">Officer Check</NavLink>
        </li>
        <li>
          <NavLink to="/validate-address">Validate Address</NavLink>
        </li>
        <li>
          <NavLink to="/analyse-name">Analyse Name</NavLink>
        </li>
        <li>
          <NavLink to="/validate-dln">Validate DLN</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/company-check" element={<CompanyCheck />} />
      <Route path="/officer-check" exact element={<OfficerCheck />} />
      <Route path="/officer-check/:id" exact element={<OfficerCheck />} />
      <Route path="/validate-address" element={<ValidateAddress />} />
      <Route path="/analyse-name" element={<AnalyseName />} />
      <Route path="/validate-dln" element={<ValidateDlN />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { AuthenticatedApp };
