import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from './AuthContext';

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else return failureCount < 2;
    },
  },
};

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  );
}

export { AppProviders };
