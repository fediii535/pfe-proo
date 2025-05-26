//import Login from "./Views/Login/login";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderRoutes, routes } from "./Routes/routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {renderRoutes(routes)}
    </QueryClientProvider>
  );
};

export default App;
