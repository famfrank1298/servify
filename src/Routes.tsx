import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import Signup from './components/Signup/Signup';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
      </Router>
      ,
    </React.StrictMode>
  </QueryClientProvider>
);

