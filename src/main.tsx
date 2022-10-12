import { Col, Container, Row } from 'react-bootstrap';
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './Firebase';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Container className="mt-5">
      <Row>
        <Col xl={{ span: 6, offset: 3}}>
          <App />
        </Col>
      </Row>
    </Container>
  </BrowserRouter>
)
