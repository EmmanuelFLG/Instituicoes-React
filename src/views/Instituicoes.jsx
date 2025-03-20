import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import InstituicoesTable from '../components/InstituicoesTable';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInstituicao from '../context/InstituicaoContext';

const Instituicoes = () => {
  const { instituicoes, setInstituicoes, show, handleShow, InstituicaoInitialValues, validationSchema } = useInstituicao();
  const [currentPage, setCurrentPage] = useState(1);

  const formik = useFormik({
    initialValues: InstituicaoInitialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedData = {
        UF: values.uf,
        Município: values.municipio,
        Mesorregião: values.mesorregiao,
        Microrregião: values.microrregiao,
        "Nome da Escola": values.nomedaescola,
        "Quantidade de Alunos": values.quantidadematriculas,
      };

      fetch('http://localhost:3000/escolas', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      }).then((response) => {
        if (response.ok) {
          getInstituicoes();
          handleShow();
          toast.success('Instituição adicionada com sucesso!');
        } else {
          toast.error('Falha ao adicionar a instituição.');
        }
      });
    },
  });

  const getInstituicoes = () => {
    fetch('http://localhost:3000/escolas')
      .then((response) => response.json())
      .then((data) => {
        setInstituicoes(data);
      })
      .catch(() => {
        console.log('Erro ao buscar instituições!');
      });
  };

  useEffect(() => {
    getInstituicoes();
  }, []);

  return (
    <>
      <div>
        <Row className="mb-4">
          <Col>
            <div className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              Adicionar Nova Instituição
            </div>
            <Button
              onClick={handleShow}
              variant="outline-primary"
              className="mt-2"
              style={{ padding: '0.5rem 2rem', fontSize: '1rem', fontWeight: 'bold' }}
            >
              Adicionar
            </Button>
          </Col>
        </Row>
      </div>

      <InstituicoesTable
        instituicoes={instituicoes}
        setInstituicoes={setInstituicoes}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Instituição</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>UF</Form.Label>
              <Form.Control
                type="text"
                name="uf"
                value={formik.values.uf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.uf && formik.errors.uf}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.uf}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                name="municipio"
                value={formik.values.municipio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.municipio && formik.errors.municipio}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.municipio}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesorregião</Form.Label>
              <Form.Control
                type="text"
                name="mesorregiao"
                value={formik.values.mesorregiao}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.mesorregiao && formik.errors.mesorregiao}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.mesorregiao}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microrregião</Form.Label>
              <Form.Control
                type="text"
                name="microrregiao"
                value={formik.values.microrregiao}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.microrregiao && formik.errors.microrregiao}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.microrregiao}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nome da Escola</Form.Label>
              <Form.Control
                type="text"
                name="nomedaescola"
                value={formik.values.nomedaescola}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.nomedaescola && formik.errors.nomedaescola}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nomedaescola}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Alunos</Form.Label>
              <Form.Control
                type="number"
                name="quantidadematriculas"
                value={formik.values.quantidadematriculas}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.quantidadematriculas && formik.errors.quantidadematriculas}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.quantidadematriculas}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Instituicoes;
