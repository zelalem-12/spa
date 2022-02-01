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
          padding: '0px 4px',
          paddingTop: ' 8px'

          // paddingTop: '10px'
          // ':hover,:focus': {
          //   borderBottom: `2px solid ${colors.base}`,
          //   textDecoration: 'none',
          // },
        },
        //   {
        //     display: 'block',
        //     padding: '8px 15px 8px 10px',
        //     margin: '5px 0',
        //     width: '100%',
        //     height: '100%',
        //     color: colors.base,
        //     borderRadius: '2px',
        //     borderLeft: '5px solid transparent',
        //     ':hover,:focus': {
        //       color: colors.indigo,
        //       textDecoration: 'none',
        //       background: colors.gray10,
        //     },
        //   },
        match
          ? {
            borderBottom: `2px solid ${colors.base}`,
            ':hover,:focus': {
              // background: colors.gray10,
              // border: '5px solid transparent',
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
        // marginTop: '0.1rem',
        // position: 'sticky',
        // top: '1px',
        // left: '1px',
        // padding: '1em 1.5em',
        // border: `1px solid ${colors.gray10}`,
        // borderRadius: '3px',
        [mq.small]: {
          // position: 'static',
          // top: 'auto',
        },
      }}
    >
      <ul
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: '0px',
          textAlign: 'center',
          marginLeft: '1rem',
        }}
      >
        <NavLink to="/">
          <span
            css={{
              color: colors.base,
              fontSize: '1.8rem',
              fontWeight: '800',
              paddingRight:'0.4rem',
              // marginLeft: '1rem',
              // lineHeight:'none',
              [mq.small]: {
                fontSize: '0.8rem',
              },
            }}
          >
            percayso
          </span>
        </NavLink>
        <NavLink to="/validate-address">
          <img src="Assets/Icons/addressUP.png" alt="Adress"  css = {{marginTop:'.7rem'}}/>
        </NavLink>

        <NavLink to="/officer-check">
          <img src="Assets/Icons/companyUP.png" alt="officer-check" css = {{marginTop:'0.7rem'}} />
        </NavLink>
        {/* <NavLink to="/analyse-name">
          <img src="Assets/Icons/companyOVER.png" alt="BigCo Inc. logo" />
        </NavLink> */}
        <NavLink to="/validate-dln">
          <img src="Assets/Icons/drivinglicenceUP.png" alt="validate-dln" css = {{marginTop:'0.7rem'}} />
        </NavLink>
        <NavLink to="/company-check">
          <img src="Assets/Icons/nameUP.png" alt="nameOver" css = {{marginTop:'0.7rem'}} />
        </NavLink>
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
