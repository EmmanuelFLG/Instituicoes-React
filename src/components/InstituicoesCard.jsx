import { Row } from 'react-bootstrap';
import InstituicaoCard from './InstituicaoCard';
import { instituicoes, imagensCarousel } from '../datasets/instituicoes';

const InstituicoesCard = () => {
  return (
    <Row>
      {instituicoes.map(({ imagem, nome, descricao }, indice) => (
        <InstituicaoCard key={indice} imagem={imagem} nome={nome} descricao={descricao} />
      ))}
    </Row>
  );
};

export default InstituicoesCard;
