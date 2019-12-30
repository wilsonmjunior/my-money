import React from 'react'

import { useMes } from '../../Hooks/useApi'

import SpinnerSimple from '../../Components/SpinnerSimple'
import Input from './EditInPlace'

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMes(data)

  const alterarPrevisaoEntrada = (value) => {
    alterarMes({ previsao_entrada: value })
  }

  const alterarPrevisaoSaida = (value) => {
    alterarMes({ previsao_saida: value })
  }

  if (infoMes.loading) {
    return <SpinnerSimple />
  }

  if (infoMes.data) {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card" style={{ padding: 10, marginBottom: 20 }}>
            <div className="d-flex justify-content-between">
              <div>Previsão de entrada: </div>
              <Input viewAs="span" value={infoMes.data.previsao_entrada} alterar={alterarPrevisaoEntrada} />
            </div>
            <div className="d-flex justify-content-between">
              <span>Entradas: </span>
              <span>{infoMes.data.entradas}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Previsão de saida: </span>
              <Input viewAs="span" value={infoMes.data.previsao_saida} alterar={alterarPrevisaoSaida} />
            </div>
            <div className="d-flex justify-content-between">
              <span>Saidas: </span>
              <span>{infoMes.data.saidas}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default InfoMes