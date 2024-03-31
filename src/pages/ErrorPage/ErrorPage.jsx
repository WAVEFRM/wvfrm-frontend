import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      <h1>Error 404 Not Found</h1>

      <NavLink to="/landing">Go to Landing Page</NavLink>
    </div>
  );
}
