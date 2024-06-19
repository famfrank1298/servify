import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import Signup from './components/Signup/Signup';
import VolunteerSignup from './components/Signup/VolunteerSignup/VolunteerSignup';
import { Toaster } from './components/ui/toaster';
import OrganizationSignup from './components/Signup/OrganizationSignup/OrganizationSignup';
import Org from './components/Org/Org';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper = (props: any) => (
  <>
    {props.children}
    <Toaster />
  </>
);

export const VolunteerSignupRoute = '/volunteer-signup';
export const OrganizationSignupRoute = '/organization-signup';
export const OrgPage = '/org';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route
            path={VolunteerSignupRoute}
            element={
              <Wrapper>
                <VolunteerSignup />
              </Wrapper>
            }
          />
        </Routes>
        <Routes>
          <Route
            path={OrgPage}
            element={
              <Wrapper>
                <Org />
              </Wrapper>
            }
          />
        </Routes>
        <Routes>
          <Route
            path={OrganizationSignupRoute}
            element={
              <Wrapper>
                <OrganizationSignup></OrganizationSignup>
              </Wrapper>
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  </QueryClientProvider>
);

