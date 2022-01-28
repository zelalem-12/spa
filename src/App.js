import { useAuth } from './context/AuthContext';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

function App() {
  const { user } = useAuth();
  return user?.token ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export { App };
