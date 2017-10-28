import React, { PropTypes } from 'react';
// import PropTypes from 'prop-types';

// import Header from 'components/Header';
// import Footer from 'components/Footer';
// import './styles.styl';


const Header = () => (
  <div className='header'>
    <h1>Header</h1>
  </div>
);


const Footer = () => (
  <div className='footer'>
    <p>Footer</p>
  </div>
);


export const Layout = ({ children }) => (
  <div className='layout'>
    <div className='layout__inner'>
      <Header className='layout__header' />
      <div className='layout__content'>
        <div className='layout__content-inner'>
          {children}
          <div className='layout__footer'>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Layout;
