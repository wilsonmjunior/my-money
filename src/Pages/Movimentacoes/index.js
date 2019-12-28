import React, { useState, useEffect, useRef } from 'react'
import SpinnerSimple from '../../Components/SpinnerSimple'

import useModel from '../../Hooks/useModel'
import Input from './EditInPlace'

const { useGet, usePost, useDelete, usePatch } = useModel()

const Movimentacoes = ({ match }) => {
  const [loadingMeses, setLoadingMeses] = useState(true)
  const inPrevEntrada = useRef('')
  const inPrevSaida = useRef('')
  
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete()
  const [patchData, patch] = usePatch()

  const [descricao, setDescricao] = useState('')
  const [valor,setValor] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setLoadingMeses(false)
    }, 1000)
  },[])

  const AtualizaMovimentacoes = () => {
    data.refetch()

    setTimeout(() => {
      dataMeses.refetch();
      setTimeout(() => {
        setLoadingMeses(false);
      }, 1000);
    }, 1000)
  }

  const onChangeDescricao = event => {
    setDescricao(event.target.value)
  }

  const onChangeValor = event => {
    setValor(event.target.value);
  }

  const salvarMovimentacao = async () => {
    setLoadingMeses(true);
    await salvar({
      descricao,
      valor
    })
    setDescricao('')
    setValor('')
    
    AtualizaMovimentacoes()
  };

  const removerMovimentacao = async (id) => {
    setLoadingMeses(true)
    await remover(`movimentacoes/${match.params.data}/${id}`)
   
    AtualizaMovimentacoes()
  }

  const alterarPrevisaoEntrada = (value) => {
    patch(`meses/${match.params.data}`, { previsao_entrada: value })
  }

  const alterarPrevisaoSaida = (value) => {
    patch(`meses/${match.params.data}`, { previsao_saida: value })
  }

  return (
    <div className="container-fluid">
      <h1>Movimentações</h1>
      {
        !dataMeses.loading && dataMeses.data && (
          !loadingMeses ? (
            <div className="row">
              <div className="col-sm-12">
                <div className="card" style={{ padding: 10, marginBottom: 20 }}>
                  <div className="d-flex justify-content-between">
                    <div>Previsão de entrada: </div>
                    <Input viewAs="span" ref={inPrevEntrada} value={dataMeses.data.previsao_entrada} alterar={alterarPrevisaoEntrada}/>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Entradas: </span>
                    <span>{dataMeses.data.entradas}</span> 
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Previsão de saida: </span>
                    <Input viewAs="span"  ref={inPrevSaida} value={dataMeses.data.previsao_saida} alterar={alterarPrevisaoSaida} />
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Saidas: </span>
                    <span>{dataMeses.data.saidas}</span> 
                  </div>
                </div>
              </div>
            </div>
          ) : <SpinnerSimple />
        ) 
      }
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object.keys(data.data).map(movimentacao => (
              <tr key={movimentacao}>
                <td>{data.data[movimentacao].descricao}</td>
                <td>R$ {data.data[movimentacao].valor}</td>
                <td className="text-rigth">
                  <button
                    className="btn btn-danger"
                    onClick={() => removerMovimentacao(movimentacao)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="card" style={{ padding: 10, marginBottom: 20 }}>
        <div className="form-row">
          <div className="col-3">
            <input
              className="form-control"
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={onChangeDescricao}
            />
          </div>
          <div className="col-3">
            <input
              className="form-control"
              type="number"
              placeholder="Valor"
              value={valor}
              onChange={onChangeValor}
            />
          </div>
          <div className="col">
            <button className="btn btn-info" onClick={salvarMovimentacao}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movimentacoes