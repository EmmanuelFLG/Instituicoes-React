import { Container } from 'react-bootstrap';
import PropriedadesCard from './InstituicoesCard';
import InstituicaoCarousel from './InstituicaoCarousel';
import { instituicoes } from '../datasets/instituicoes';

const Main = () => {
  return (
    <main>
      <Container fluid className="mt-2">
        <InstituicaoCarousel instituicoes={instituicoes} />
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
