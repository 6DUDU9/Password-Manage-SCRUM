import "./agregarCuenta.css";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { TfiWorld } from "react-icons/tfi";

function agregarCuenta({ onAgregar, onCancelar }) {

  const hanlderAgregarCuenta = () => {
    const nuevaCuenta = {
      id: Math.random().toString(36).substr(2, 9),
      sitioWeb: document.querySelector('input[name="sitioWeb"]').value,
      usuario: document.querySelector('input[name="usuario"]').value,
      contraseña: document.querySelector('input[name="contraseña"]').value,
    }
    onAgregar(nuevaCuenta);
  }

  const generarContraseña = () => {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&";
    let contraseña = "";
    for (let i = 0; i <= 8; i++) {
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    document.querySelector('input[name="contraseña"]').value = contraseña;
  }

  return (
    <>
      <div className="agregar-cuenta">
        <div className="nombre-agregar">
          <TfiWorld className="icono-web" />
          <input type="text" name="sitioWeb" placeholder="Sitio Web" className="txt-sitio-agregar" />
        </div>
        <div className="usuario-agregar">
          <CiUser className="div-icono-usuario" />
          <input type="text" name="usuario" placeholder="Usuario" className="txt-usuario-agregar" />
        </div>
        <div className="contraseña-agregar">
          <CiLock className="div-icono-contraseña" />
          <input type="text" name="contraseña" placeholder="Contraseña" className="txt-contraseña-agregar" />
        </div>
        <div className="botones">
          <button className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
          <button className="btn-generar-contraseña" onClick={generarContraseña} >Generar Contraseña</button>
          <button className="btn-agregar" onClick={hanlderAgregarCuenta}>Agregar</button>
        </div>
      </div>
    </>
  );
}

export default agregarCuenta;