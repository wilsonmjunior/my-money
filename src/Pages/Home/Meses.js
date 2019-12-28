
import React from 'react';
import { Link } from 'react-router-dom';
import SpinnerSimple from '../../Components/SpinnerSimple';

import useModel from '../../Hooks/useModel';

const { useGet} = useModel();

const Meses = () => {
  const data = useGet("meses");

  if (data.loading) {
    return <SpinnerSimple />
  }
  return (
    <>
      {Object.keys(data.data).length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Previsão de entrada</th>           
              <th>Entradas</th>
              <th>Previsão de saida</th>
              <th>Saidas</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.data).map(mes => (
              <tr key={mes}>
                <td>
                  <Link to={`movimentacoes/${mes}`}>{mes}</Link>
                </td>
                <td>{data.data[mes].previsao_entrada}</td>
                <td>{data.data[mes].entradas}</td>
                <td>{data.data[mes].previsao_saida}</td>
                <td>{data.data[mes].saidas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Meses;