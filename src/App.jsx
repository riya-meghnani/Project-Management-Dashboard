import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ThemeContextProvider from './context/ThemeContext';
import {Provider} from 'react-redux'
import store from './store/store';
import Layout from './components/Layout';
import { lazy } from 'react';
import Settings from './pages/Settings';
const ProjectDetails = lazy(()=> import('./pages/ProjectDetails'));


const Routes = createBrowserRouter([
  {
    path: "/",
    element: < Layout/>,
    children: [
      {
        path: "/",
        element: < Dashboard/>,
      },
      {
        path: "/dashboard",
        element: < Dashboard/>,
      },
      {
        path: "/project/:id",
        element: < ProjectDetails/>,
      },
      {
        path: "/settings",
        element: <Settings/>,
      },
    ]
  },
]);

function App() {

  return (
    <>
     <ThemeContextProvider>
      <Provider store={store}>
      <RouterProvider router={Routes} fallbackElement= {<h1>404 Not Found</h1>}/> 
      </Provider>
      </ThemeContextProvider>
    </>
  )
}

export default App
