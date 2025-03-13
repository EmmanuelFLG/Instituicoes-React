import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', paddingTop: '25px' }}>
      <Container fluid className="bg-light text-center text-muted">
        <Row className="py-5">
          <Col md={4} className="mx-auto mb-4">
            <div className="mb-3">
              <Image
                src="/src/assets/logolivro.png"
                alt="Logo Portal Educacional"
                style={{ width: '150px' }}
              />
            </div>
            <h6 className="text-uppercase fw-bold mb-4">PortalEducacional</h6>
            <p>
              Acesse as melhores informações sobre instituições educacionais
              em todo o Brasil.
            </p>
          </Col>

          <Col md={4} className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
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

        <div
          className="text-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          © 2021 Copyright:
          <a
            className="text-reset fw-bold"
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
