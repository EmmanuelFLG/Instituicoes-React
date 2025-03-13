import { useEffect, useState } from "react";
import { Button, Table, Container, ButtonGroup, Modal } from "react-bootstrap";
import { FaTrash, FaPen } from "react-icons/fa";

const InstituicoesTable = ({ instituicoes, setInstituicoes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const [show, setShow] = useState(false);
  const [instituicaoToDelete, setInstituicaoToDelete] = useState(null);

  const getInstituicoes = () => {
    fetch("http://localhost:3000/escolas")
      .then((response) => response.json())
      .then((data) => {
        setInstituicoes([...data]);
      })
      .catch(() => {
        console.log("Erro ao buscar instituições!");
      });
  };

  const handleDelete = async () => {
    if (!instituicaoToDelete) return;

    console.log("Deletando instituição com ID:", instituicaoToDelete.id);

    try {
      const response = await fetch(
        `http://localhost:3000/escolas/${instituicaoToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Erro ao deletar instituição. Status: ${response.status}`);
      }
      setInstituicoes((prevInstituicoes) =>
        prevInstituicoes.filter(
          (instituicao) => instituicao.id !== instituicaoToDelete.id
        )
      );
      setShow(false);
      setInstituicaoToDelete(null);

      console.log("Instituição deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };
  
  const handleShowModal = (instituicao) => {
    setInstituicaoToDelete(instituicao);
    setShow(true); 
  };
  
  const handleCloseModal = () => {
    setShow(false);  
    setInstituicaoToDelete(null);  
  };

  useEffect(() => {
    getInstituicoes();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = instituicoes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(instituicoes.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Table bordered hover>
        <thead>
          <tr>
            <th>UF</th>
            <th>Município</th>
            <th>Mesorregião</th>
            <th>Microrregião</th>
            <th>Nome da Escola</th>
            <th>Quantidade de Alunos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((instituicao) => (
            <tr key={instituicao.id}>
              <td>{instituicao.UF}</td>
              <td>{instituicao.Município}</td>
              <td>{instituicao.Mesorregião}</td>
              <td>{instituicao.Microrregião}</td>
              <td>{instituicao["Nome da Escola"]}</td>
              <td>{instituicao["Quantidade de Alunos"]}</td>
              <td>
                <Button variant="warning" className="mx-2">
                  <FaPen />
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => handleShowModal(instituicao)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="mx-3 align-self-center">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </ButtonGroup>
      </div>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir esta instituição?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InstituicoesTable;
