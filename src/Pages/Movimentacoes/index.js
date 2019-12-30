import React, { useEffect } from 'react'

import { useMovimentacao } from '../../Hooks/useApi'

import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = ({ match }) => {
  const { movimentacoes, adicionarMovimentacao, removerMovimentacao } = useMovimentacao(match.params.data)
  let mounted = true;
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mounted = true
    return () => {
      mounted = false
    }
  })

  const onSalvarMovimentacao = async (dados) => { 
    await adicionarMovimentacao(dados)
    movimentacoes.refetch()
  };

  const onRemoverMovimentacao = async (id) => {
    await removerMovimentacao(id)
    movimentacoes.refetch()
  }

  return (
    <div className="container-fluid">
      <h1>Movimentações</h1>
      { mounted && <InfoMes data={match.params.data} /> }
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object.keys(movimentacoes.data).map(movimentacao => (
              <tr key={movimentacao}>
                <td>{movimentacoes.data[movimentacao].descricao}</td>
                <td>R$ {movimentacoes.data[movimentacao].valor}</td>
                <td className="text-rigth">
                  <button
                    className="btn btn-danger"
                    onClick={() => onRemoverMovimentacao(movimentacao)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <AdicionarMovimentacao onSalvarMovimentacao={onSalvarMovimentacao} />
    </div>
  )
}

export default Movimentacoes