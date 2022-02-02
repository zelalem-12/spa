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
// import AnalyseName from 'pages/AnalyseName';
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
          justifyContent: 'space-between',
          alignItems: 'center',
          [mq.small]: {
            display: 'none',
          },
        }}
      >
        <div>
          <Nav />
        </div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            color: colors.base,
          }}
        >
          {user.username}
          <Button variant="secondary" css={{ marginRight: '1.5rem' }} onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      <div
        css={{
          margin: '0 auto',
          padding: '3em 0em',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '90%',
          },
        }}
      >
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
          position: 'relative',
        },
        match
          ? {
              '::after': {
                content: `''`,
                position: 'absolute',
                width: '1rem',
                height: '1rem',
                left: '30%',
                top: '0.25rem',
                borderWidth: '0.5rem',
                borderStyle: 'solid',

                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: 'transparent',
                borderBottomColor: colors.base,
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
        [mq.small]: {},
      }}
    >
      <ul
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: '0px',
          textAlign: 'center',
          marginTop: '1.35rem',
        }}
      >
        <div
          css={{
            marginLeft: '.55rem',
            '& img': {
              width: '1.4rem',
              margin: '0 .59rem',
              marginBottom: '3.5rem',
            },
          }}
        >
          <NavLink to="/">
            <img src="Assets/Logos/logo-small.png" alt="Adress" css={{ minWidth: '8.55rem ', textAlign: 'center' }} />
          </NavLink>

          <NavLink to="/validate-address">
            <img src="Assets/Icons/addressUP.png" alt="Adress" />
          </NavLink>
          <NavLink to="/officer-check">
            <img src="Assets/Icons/companyUP.png" alt="officer-check" />
          </NavLink>
          {/* <NavLink to="/analyse-name">
          <img src="Assets/Icons/companyOVER.png" alt="BigCo Inc. logo" />
        </NavLink> */}
          <NavLink to="/validate-dln">
            <img src="Assets/Icons/drivinglicenceUP.png" alt="validate-dln" />
          </NavLink>
          <NavLink to="/company-check">
            <img src="Assets/Icons/nameUP.png" alt="nameOver" />
          </NavLink>
        </div>
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
      {/* <Route path="/analyse-name" element={<AnalyseName />} /> */}
      <Route path="/validate-dln" element={<ValidateDlN />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { AuthenticatedApp };
