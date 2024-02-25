import './navbar.css';
import { CiSearch } from "react-icons/ci";
import Swal from 'sweetalert2';

function Navbar({ desencriptarCuentas, setMostrarAgregarCuenta, buscarCuenta, contraseñasDesemcriptadas }) {
  return (
    <nav className="navbar-principal">
      <div className="input-container">
        <input type="text" placeholder="Busca un sitio web" className='txt-buscar' onChange={buscarCuenta} />
        <CiSearch className="search-icon" />
      </div>
      <button className='btn-revelar' onClick={desencriptarCuentas} disabled={contraseñasDesemcriptadas}>Revelar Cuenta</button>
      <button
        className='btn-agregar'
        onClick={() => {
          if (contraseñasDesemcriptadas) {
            setMostrarAgregarCuenta(true);
          } else {
            Swal.fire('Revelar las contraseñas', 'Debe revelar las contraseñas para poder agregar cuentas', 'error');
          }
        }}
      >Agregar Cuenta</button>
    </nav>
  );
}

export default Navbar;