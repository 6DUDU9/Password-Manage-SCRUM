import { useEffect, useState } from 'react';
import './App.css';
import archivo from './cuentas/cuentas.json';
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import AgregarCuenta from './componentes/agregarCuenta';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import NavBar from './componentes/navbar';
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

function App() {
  
  const [cuentas, setCuentas] = useState([]);
  const [mostrarAgregarCuenta, setMostrarAgregarCuenta] = useState(false);
  const [contraseñaGuardada, setContraseñaGuardada] = useState(false);
  const [tempContraseña, setTempContraseña] = useState('');
  const [contraseñasDesemcriptadas, setContraseñasDesemcriptadas] = useState(false);

  const guardarCuentasEnArchivo = (nuevasCuentas) => {
    localStorage.setItem('cuentas', JSON.stringify(nuevasCuentas));
  }

  const guardarContraseñaLocalStorage = (contraseña) => {
    localStorage.setItem('contraseña', contraseña);
  }

  useEffect(() => {
    const contraseñaGuardada = localStorage.getItem('contraseña');
    if (!contraseñaGuardada) {
      solicitarContraseña();
    } else {
      setContraseñaGuardada(true);
    }

    const cuentasGuardadas = JSON.parse(localStorage.getItem('cuentas')) || archivo;
    const cuentasEncriptadas = cuentasGuardadas.map(cuenta => {

      const contraseña = CryptoJS.AES.encrypt(cuenta.contraseña, contraseñaGuardada || tempContraseña).toString();
      return { ...cuenta, contraseña };
    });
    setCuentas(cuentasEncriptadas);
  }, [contraseñaGuardada, tempContraseña]);

  const agregarCuenta = (nuevaCuenta) => {
    const nuevasCuentas = [...cuentas, nuevaCuenta];
    setCuentas(nuevasCuentas);
    guardarCuentasEnArchivo(nuevasCuentas);
    setMostrarAgregarCuenta(false);
  }

  const eliminarCuenta = (id) => {
    const nuevasCuentas = cuentas.filter((cuenta) => cuenta.id !== id);
    setCuentas(nuevasCuentas);
    guardarCuentasEnArchivo(nuevasCuentas);
  }

  const editarCuenta = (id) => {
    const nuevasCuentas = cuentas.map((cuenta) => {
      if (cuenta.id === id) {
        return { ...cuenta, editando: !cuenta.editando };
      }
      return cuenta;
    });
    setCuentas(nuevasCuentas);
  }

  const actualizarCuenta = (id) => {
    const nuevasCuentas = cuentas.map((cuenta) => {
      if (cuenta.id === id) {
        return {
          ...cuenta,
          sitioWeb: document.querySelector('input[name="sitioWeb"]').value,
          usuario: document.querySelector('input[name="usuario"]').value,
          contraseña: document.querySelector('input[name="contraseña"]').value,
          editando: false
        };
      }
      return cuenta;
    });
    setCuentas(nuevasCuentas);
    guardarCuentasEnArchivo(nuevasCuentas);
  }

  const descargarContraseñas = () => {
    const textoContraseñas = cuentas.map(cuenta => `Sitio Web: ${cuenta.sitioWeb}, Usuario: ${cuenta.usuario}, Contraseña: ${cuenta.contraseña}`).join('\n');
    const blod = new Blob([textoContraseñas], { type: 'text/plain' });
    const url = URL.createObjectURL(blod);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contraseñas.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const buscarCuenta = (e) => {
    const texto = e.target.value.toLowerCase();
    const cuentasGuardadas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const nuevasCuentas = cuentasGuardadas.filter(cuenta => cuenta.sitioWeb.toLowerCase().includes(texto) || cuenta.usuario.toLowerCase().includes(texto) || cuenta.contraseña.toLowerCase().includes(texto));
    setCuentas(nuevasCuentas);
  }

  const desencriptarCuentas = async () => {
    const { value: contraseña } = await Swal.fire({
      title: 'Ingrese su contraseña',
      input: 'password',
      inputLabel: 'Contraseña',
      inputPlaceholder: 'Ingrese su contraseña',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    });
    if (contraseña === (localStorage.getItem('contraseña') || tempContraseña)) {
      const cuentasDesencriptadas = cuentas.map(cuenta => {
        const contraseñaDesencriptada = CryptoJS.AES.decrypt(cuenta.contraseña, contraseña).toString(CryptoJS.enc.Utf8);
        return { ...cuenta, contraseña: contraseñaDesencriptada };
      });
      setCuentas(cuentasDesencriptadas);
      setContraseñasDesemcriptadas(true);
    } else {
      Swal.fire('Contraseña incorrecta', 'La contraseña ingresada es incorrecta', 'error');
    }
  }

  const solicitarContraseña = async () => {
    const { value: contraseña } = await Swal.fire({
      title: 'Ingrese su contraseña',
      input: 'password',
      inputLabel: 'Esta contraseña será utilizada para revelar sus cuentas.',
      inputPlaceholder: 'Ingrese su contraseña',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    });
    if (contraseña) {
      guardarContraseñaLocalStorage(contraseña);
    }
  }


  return (
    <div className='App'>
      <h1><strong>Password Manager</strong></h1>
      <NavBar desencriptarCuentas={desencriptarCuentas} setMostrarAgregarCuenta={setMostrarAgregarCuenta} buscarCuenta={buscarCuenta} contraseñasDesemcriptadas={contraseñasDesemcriptadas} />
      <div className='contenedor-contraseñas'>
        {mostrarAgregarCuenta && <AgregarCuenta onAgregar={agregarCuenta} onCancelar={() => setMostrarAgregarCuenta(false)} />}
        <ul className='lista-cuentas'>
          {cuentas.map((cuenta, index) => (
            <li key={index} >
              <div className='nombre-cuenta'>
                <div>
                  <strong>Nombre: </strong>
                  {cuenta.editando ? <input type='text' name="sitioWeb" defaultValue={cuenta.sitioWeb} className='txt-sitio-edit' /> : cuenta.sitioWeb}
                </div>
                <div className='iconos-acciones'>
                  <FiEdit2
                    className='icon-update'
                    title='Debe revelar las contraseñas para poder descargar las cuentas'
                    onClick={() => {
                      if (contraseñasDesemcriptadas) {
                        editarCuenta(cuenta.id);
                      } else {
                        Swal.fire('Revelar las contraseñas', 'Debe revelar las contraseñas para poder editar las cuentas', 'error');
                      }
                    }}
                  />
                  <MdDelete className='icon-delete' onClick={() => eliminarCuenta(cuenta.id)} />
                </div>
              </div>
              <div className='usuario-cuenta'>
                <div className='div-icono-usuario'>
                  <CiUser />
                </div>
                <div className='titulo-usuario'>
                  <strong>Nombre de usuario </strong>
                  {cuenta.editando ? <input type='text' name="usuario" defaultValue={cuenta.usuario} className='txt-usuario-edit' /> : cuenta.usuario}
                </div>
              </div>
              <div className='contraseña-cuenta'>
                <div className='div-icono-contraseña'>
                  <CiLock />
                </div>
                <div className='titulo-contraseña'>
                  <strong>Contraseña </strong>
                  {cuenta.editando ? <input type='text' name="contraseña" defaultValue={cuenta.contraseña} className='txt-contraseña-edit' /> : cuenta.contraseña}
                </div>
              </div>
              <div className='div-botones-edit'>
              {cuenta.editando && <button onClick={() => editarCuenta(cuenta.id, true)} className='btn-cancelar-edit'>Cancelar</button>}
              {cuenta.editando &&
                <button onClick={() => actualizarCuenta(cuenta.id)} className='btn-atualizar-edit'>
                  Actualizar
                </button>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        className='btn-descargar'
        onClick={() => {
          if (contraseñasDesemcriptadas) {
            descargarContraseñas();
          } else {
            Swal.fire('Revelar las contraseñas', 'Debe revelar las contraseñas para poder descargar las cuentas', 'error');
          }

        }}
      >Descargar Contraseñas</button>
    </div>
  );
}


export default App;

