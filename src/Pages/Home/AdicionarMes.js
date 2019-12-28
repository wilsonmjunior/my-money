import React, {useState, useRef} from 'react';
import { Redirect } from 'react-router-dom';

const minAno = 2019;
const maxAno = 2022;

const AdicionarMes = () => {
  const anoRef = useRef()
  const mesRef = useRef();
  const [dir, setDir] = useState('');

  const anos = [];
  const meses = [];

  for (let i = minAno; i < maxAno; i++) {
    anos.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    meses.push(i);
  }

  const ZeroPad = num => {
    return num < 10 ? `0${num}` : num;
  }

  const verMes = () => {
    setDir(`${anoRef.current.value}-${mesRef.current.value}`);
  }

  if (dir !== '') {
    return <Redirect to={`movimentacoes/${dir}`} />
  }
  return (
    <>
      <h2>Adicionar mês</h2>
      <div className="row">
        <div className="col-sm-12">
          <div className="form-row">
            <div className="col-3">
              <select ref={anoRef} className="form-control">
                {
                  anos.map(ano => <option key={ano} value={ano}>{ano}</option>)
                }
              </select>
            </div>
            <div className="col-3">
              <select ref={mesRef} className="form-control">
                {
                  meses.map(ZeroPad).map(mes => <option key={mes} value={mes}>{mes}</option>)
                }
              </select>
            </div>
            <div className="col">
              <button className="btn btn-info" onClick={verMes}>Adicionar mês</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdicionarMes;