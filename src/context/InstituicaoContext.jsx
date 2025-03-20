import { createContext, useContext, useState } from 'react';
import * as yup from 'yup';

const InstituicaoContext = createContext();

export function InstituicaoContextProvider({ children }) {
  const [instituicoes, setInstituicoes] = useState([]);
  const [show, setShow] = useState(false); 

  const handleShow = () => setShow(!show);

  const InstituicaoInitialValues = {
    uf: '',
    municipio: '',
    mesorregiao: '',
    microrregiao: '',
    nomedaescola: '',
    quantidadematriculas: '',
  };

  const validationSchema = yup.object({
    uf: yup.string().required('UF é obrigatório').matches(/^[^\d]*$/, 'UF não pode conter números'),
    municipio: yup.string().required('Município é obrigatório').matches(/^[^\d]*$/, 'Município não pode conter números'),
    mesorregiao: yup.string().required('Mesorregião é obrigatória').matches(/^[^\d]*$/, 'Mesorregião não pode conter números'),
    microrregiao: yup.string().required('Microrregião é obrigatória').matches(/^[^\d]*$/, 'Microrregião não pode conter números'),
    nomedaescola: yup.string().required('Nome da Escola é obrigatório').matches(/^[^\d]*$/, 'Nome da Escola não pode conter números'),
    quantidadematriculas: yup.number().required('Quantidade de Matrículas é obrigatória').positive('Deve ser um número positivo').integer('Deve ser um número inteiro'),
  });

  return (
    <InstituicaoContext.Provider value={{ instituicoes, setInstituicoes, InstituicaoInitialValues, validationSchema, show, handleShow }}>
      {children}
    </InstituicaoContext.Provider>
  );
}

export default function useInstituicao() {
  return useContext(InstituicaoContext);
}
