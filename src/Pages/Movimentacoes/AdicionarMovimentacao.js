import React, { useState } from 'react'

const AdicionarMovimentacao = ({ onSalvarMovimentacao }) => {
  const [dados, setDados] = useState({})
 
  const onChange = (field) => (e) => {
    setDados({
      ...dados,
      [field]: e.target.value,
    })
  }
  
  const salvarMovimentacao = async() => {
    onSalvarMovimentacao(dados)
    setDados({})
  }

  return (
    <div className="card" style={{ padding: 10, marginBottom: 20 }}>
      <div className="form-row">
        <div className="col-3">
          <input
            className="form-control"
            type="text"
            placeholder="Descrição"
            value={dados.descricao}
            onChange={onChange('descricao')}
          />
        </div>
        <div className="col-3">
          <input
            className="form-control"
            type="number"
            placeholder="Valor"
            value={dados.valor}
            onChange={onChange('valor')}
          />
        </div>
        <div className="col">
          <button className="btn btn-info" onClick={salvarMovimentacao}>
            Adicionar
            </button>
        </div>
      </div>
    </div>
  )
}

export default AdicionarMovimentacao