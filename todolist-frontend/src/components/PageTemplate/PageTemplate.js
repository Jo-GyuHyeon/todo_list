import * as React from 'react';
import Header from './Header';
import Nav from './Nav';
import './styles.scss';

const PageTemplate = ({ children }) => (
  <div className="page">
    <header className="page__header">
      <Header />
    </header>
    <nav className="page__nav">
      <Nav />
    </nav>
    <main className="page__body">{children}</main>
  </div>
);

export default PageTemplate;
