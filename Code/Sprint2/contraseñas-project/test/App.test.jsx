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

    fireEvent.change(getByPlaceholderText('Nombre'), { target: { value: 'Nueva Cuenta' } });
    fireEvent.change(getByPlaceholderText('Usuario'), { target: { value: 'usuario' } });
    fireEvent.change(getByPlaceholderText('Contraseña'), { target: { value: 'contraseña' } });
    fireEvent.click(getByText('Agregar'));

    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith({
      nombre: 'Nueva Cuenta',
      usuario: 'usuario',
      contraseña: 'contraseña',
    });
  });
});

