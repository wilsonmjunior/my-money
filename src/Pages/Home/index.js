
import React from 'react';
import AdicionarMes from './AdicionarMes';
import Meses from './Meses';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="container-fluid" style={{ marginTop: 20 }}>
          <AdicionarMes />
          <br />
          <Meses />
        </div>
      </div>
    </div>
  );
};

export default Home;