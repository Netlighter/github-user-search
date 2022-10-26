import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'
import './index.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UserPage from './components/UserPage/UserPage'
import SearchPage from './components/SearchPage/SearchPage';
import CommitPage from './components/CommitPage/CommitPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "user",
    element: <UserPage />,
  },
  {
    path: "commits",
    element: <CommitPage />,
  },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

