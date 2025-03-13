import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './views/Home';
import Instituicoes from './views/Instituicoes';
import { BrowserRouter, Route, Routes } from 'react-router';
import Principal from './layouts/Principal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />}>
          <Route index element={<Home />} />
          <Route path="instituicoes" element={<Instituicoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
