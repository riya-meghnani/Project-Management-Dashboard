import React from 'react'
import Navbar from './NavBar'
import {Outlet} from 'react-router-dom'
import {Suspense} from 'react'

export default function Layout() {
  return (
    <>
      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}
