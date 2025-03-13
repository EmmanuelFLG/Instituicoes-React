import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import InstituicoesTable from '../components/InstituicoesTable';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';  
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const Instituicoes = () => {
  let [instituicoes, setInstituicoes] = useState([]);
  let [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  
  const handleShow = () => setShow(!show);

  const validationSchema = Yup.object({
    uf: Yup.string().required('UF é obrigatório').matches(/^[^\d]*$/, 'UF não pode conter números'),
    municipio: Yup.string().required('Município é obrigatório').matches(/^[^\d]*$/, 'Município não pode conter números'),
    mesorregiao: Yup.string().required('Mesorregião é obrigatória').matches(/^[^\d]*$/, 'Mesorregião não pode conter números'),
    microrregiao: Yup.string().required('Microrregião é obrigatória').matches(/^[^\d]*$/, 'Microrregião não pode conter números'),
    nomedaescola: Yup.string().required('Nome da Escola é obrigatório').matches(/^[^\d]*$/, 'Nome da Escola não pode conter números'),
    quantidadematriculas: Yup.number().required('Quantidade de Matrículas é obrigatória').positive('Deve ser um número positivo').integer('Deve ser um número inteiro'),
  });

  const formik = useFormik({
    initialValues: {
      uf: '',
      municipio: '',
      mesorregiao: '',
      microrregiao: '',
      nomedaescola: '',
      quantidadematriculas: '',
    },
    validationSchema,
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
          setShow(!show);
          toast.success('Instituição adicionada com sucesso!');
        } else {
          toast.error('Falha ao adicionar a instituição.');
        }
      });
    },
  });

  const getInstituicoes = () => {
    fetch("http://localhost:3000/escolas")
      .then((response) => response.json())
      .then((data) => {
        setInstituicoes(data);
      })
      .catch(() => {
        console.log("Erro ao buscar instituições!");
      });
  };

  useEffect(() => {
    getInstituicoes();
  }, []);

  return (
    <>
      <ToastContainer />
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
              <Form.Label>Quantidade de Matrículas</Form.Label>
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
    </>
  );
};

export default Instituicoes;
