import React from 'react';
// import './Header.css';

const Header = ({ title }) => {
  return (
    <header className="header p-5 m-5 rounded">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
