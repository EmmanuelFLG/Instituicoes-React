import { Carousel, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { imagensCarousel } from '../datasets/instituicoes'; 

const InstituicaoCarousel = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Carousel className="mt-5 mb-4">
            {imagensCarousel.map((imagem, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={imagem}
                  alt={`Imagem do carrossel ${index + 1}`}
                  style={{ objectFit: 'cover', height: '500px' }} 
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

InstituicaoCarousel.propTypes = {
  imagensCarousel: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InstituicaoCarousel;
