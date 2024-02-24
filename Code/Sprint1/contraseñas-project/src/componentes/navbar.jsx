import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

function navbar({desencriptarCuentas, setMostrarAgregarCuenta, buscarCuenta, contraseñasDesemcriptadas}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="">Password Encryptor</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
              onChange={buscarCuenta}
            />
            <Button variant="primary" className="m-1" onClick={desencriptarCuentas} disabled={contraseñasDesemcriptadas}>Revelar Cuenta</Button>
            <Button variant="success" className="m-1" onClick={() => setMostrarAgregarCuenta(true)}>Agregar Cuenta</Button>
          </Form>
      </Container>
    </Navbar>
  );
}

export default navbar;