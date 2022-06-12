import type { Component } from 'solid-js';

import styles from './App.module.css';
import { Container, Nav } from 'solid-bootstrap';

const App: Component = () => {
  return (
    <Container class={styles.App}>
      <Container fluid={true}>
        <Nav variant="pills" defaultActiveKey="#">
          <Nav.Item>
            <Nav.Link href="#">Potenzen</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Container>
  );
};

export default App;
