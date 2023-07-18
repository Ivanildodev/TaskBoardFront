import React, { useState } from 'react';
import { Nav, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import routes from '../static/routesconfig';
import '../styles/SideBar.css';

const SidebarMenu = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <Nav className="sidebar-menu flex-column">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Board
        </Nav.Link>
      </Nav.Item>
      <Accordion>
        <Accordion.Toggle as={Nav.Link} eventKey="0" onClick={handleToggleSubmenu}>
          <span>Cadastro </span>
          <FontAwesomeIcon
            icon={submenuOpen ? faChevronUp : faChevronDown}
            size='sm'
            className="dropdown-icon"
          />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Nav className="flex-column pl-3">
            <Nav.Item>
              <Nav.Link as={Link} to={routes.VIEW_COLABORADOR}>
                Colaborador
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={routes.VIEW_CARGO}>
                Cargo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={routes.VIEW_TAREFA}>
                Tarefa
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Accordion.Collapse>
      </Accordion>
    </Nav>
  );
};

export default SidebarMenu;
