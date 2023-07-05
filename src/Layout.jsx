import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <>
      <Link to="/">뒤로가기</Link>
      <div>{children}</div>
    </>
  );
};

export default Layout;
