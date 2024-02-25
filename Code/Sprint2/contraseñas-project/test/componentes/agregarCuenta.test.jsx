import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AgregarCuenta from '../../src/componentes/agregarCuenta';

describe('Componente AgregarCuenta', () => {
  it('debería mostrar el formulario de agregar cuenta', () => {
    const { getByText } = render(<AgregarCuenta />);
    expect(getByText('Agregar Cuenta')).toBeInTheDocument();
  });

  it('debería llamar a la función onAgregar al enviar el formulario', () => {
    const onAgregar = jest.fn();
    const { getByText, getByPlaceholderText } = render(<AgregarCuenta onAgregar={onAgregar} />);

    fireEvent.change(getByPlaceholderText('Sitio Web'), { target: { value: 'Nueva Cuenta' } });
    fireEvent.change(getByPlaceholderText('Usuario'), { target: { value: 'usuario' } });
    fireEvent.change(getByPlaceholderText('Contraseña'), { target: { value: 'contraseña' } });
    fireEvent.click(getByText('Agregar'));

    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith({
      sitioWeb: 'Nueva Cuenta',
      usuario: 'usuario',
      contraseña: 'contraseña',
    });
  });

  it('debería llamar a la función onCancelar al hacer clic en el botón cancelar', () => {
    const onCancelar = jest.fn();
    const { getByText } = render(<AgregarCuenta onAgregar={() => {}} onCancelar={onCancelar} />);

    fireEvent.click(getByText('Cancelar'));

    expect(onCancelar).toHaveBeenCalledTimes(1);
  });

  it('debería generar una contraseña aleatoria al hacer clic en el botón generar contraseña', () => {
    const { getByText, getByPlaceholderText } = render(<AgregarCuenta />);

    const contraseñaOriginal = document.querySelector('input[name="contraseña"]').value;

    fireEvent.click(getByText('Generar Contraseña'));

    const contraseñaGenerada = document.querySelector('input[name="contraseña"]').value;

    expect(contraseñaOriginal).not.toBe(contraseñaGenerada);
    expect(contraseñaGenerada.length).toBe(8);
  });
});
