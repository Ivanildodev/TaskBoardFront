import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarMenu from './components/Sidebar';
import Routes from './Routes';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <div className='row-wrapper'>
        <Row>
          <Col md={2}>
            <SidebarMenu />
          </Col>
          <Col>
            <Routes />
          </Col>
        </Row>
      </div>
    </Router>
  );
};

export default App;
