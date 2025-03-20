import { Container, Row, Col, Image } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid className="footer-container">
        <Row className="footer-row">
          <Col md={4} className="mx-auto mb-4">
            <div className="footer-logo">
              <Image
                src="/src/assets/logolivro.png"
                alt="Logo Portal Educacional"
              />
            </div>
            <h6 className="footer-heading">PortalEducacional</h6>
            <p>
              Acesse as melhores informações sobre instituições educacionais
              em todo o Brasil.
            </p>
          </Col>

          <Col md={4} className="mx-auto mb-md-0 mb-4">
            <h6 className="footer-heading">Contato</h6>
            <p>
              <strong>Endereço:</strong> New York, NY 10012, US
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            <p>
              <strong>Telefone:</strong> +01 234 567 88
            </p>
            <p>
              <strong>Fax:</strong> +01 234 567 89
            </p>
          </Col>
        </Row>

        <div className="footer-bottom text-center">
          © 2021 Copyright:
          <a
            href="https://react-bootstrap.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Bootstrap
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
