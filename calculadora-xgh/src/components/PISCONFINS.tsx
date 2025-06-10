import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function PISCONFINS() {
  const [valorTotal, setValorTotal] = useState('');
  const [aliquotaPis, setAliquotaPis] = useState('');
  const [aliquotaCofins, setAliquotaCofins] = useState('');
  const [regimeTributarioEmpresa, setRegimeTributarioEmpresa] = useState('SIMPLES_NACIONAL'); 
  const [tipoOperacao, setTipoOperacao] = useState('VENDA_DE_MERCADORIA'); 
  const [baseCalculoManualPisCofins, setBaseCalculoManualPisCofins] = useState('');
  const [valorExclusoesBaseCalculo, setValorExclusoesBaseCalculo] = useState('');

  const [baseCalculoPis, setBaseCalculoPis] = useState('');
  const [aliquotaPisAplicada, setAliquotaPisAplicada] = useState('');
  const [valorPisCalculado, setValorPisCalculado] = useState('');
  const [baseCalculoCofins, setBaseCalculoCofins] = useState('');
  const [aliquotaCofinsAplicada, setAliquotaCofinsAplicada] = useState('');
  const [valorCofinsCalculado, setValorCofinsCalculado] = useState('');
  const [tipoRegimePisCofins, setTipoRegimePisCofins] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularPisCofins = async () => {
    setError('');
    setLoading(true);

    try {
      const body = {
        valorTotal,
        aliquotaPis,
        aliquotaCofins,
        regimeTributarioEmpresa,
        tipoOperacao,
        baseCalculoManualPisCofins,
        valorExclusoesBaseCalculo
      };

      const response = await fetch(`${API_URL}/calcular/piscofins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();

      setBaseCalculoPis(parseFloat(data.baseCalculoPis).toFixed(8));
      setAliquotaPisAplicada(parseFloat(data.aliquotaPisAplicada).toFixed(2));
      setValorPisCalculado(parseFloat(data.valorPisCalculado).toFixed(2));

      setBaseCalculoCofins(parseFloat(data.baseCalculoCofins).toFixed(8));
      setAliquotaCofinsAplicada(parseFloat(data.aliquotaCofinsAplicada).toFixed(2));
      setValorCofinsCalculado(parseFloat(data.valorCofinsCalculado).toFixed(2));

      setTipoRegimePisCofins(data.tipoRegimePisCofins);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de PIS/COFINS</h2>

      <label>Valor Total</label>
      <input
        type="number"
        step="0.00000001"
        value={valorTotal}
        onChange={(e) => setValorTotal(e.target.value)}
      />

      <label>Alíquota PIS (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaPis}
        onChange={(e) => setAliquotaPis(e.target.value)}
      />

      <label>Alíquota COFINS (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaCofins}
        onChange={(e) => setAliquotaCofins(e.target.value)}
      />

      <label>Regime Tributário</label>
      <select value={regimeTributarioEmpresa} onChange={(e) => setRegimeTributarioEmpresa(e.target.value)}>
        <option value="SIMPLES_NACIONAL">Simples Nacional</option>
        <option value="LUCRO_PRESUMIDO">Lucro Presumido</option>
        <option value="LUCRO_REAL">Lucro Real</option>
      </select>

      <label>Tipo de Operação</label>
      <select value={tipoOperacao} onChange={(e) => setTipoOperacao(e.target.value)}>
        <option value="VENDA">Venda</option>
        <option value="COMPRA">Compra</option>
      </select>

      <label>Base de Cálculo Manual (se aplicável)</label>
      <input
        type="number"
        step="0.00000001"
        value={baseCalculoManualPisCofins}
        onChange={(e) => setBaseCalculoManualPisCofins(e.target.value)}
      />

      <label>Exclusões da Base de Cálculo</label>
      <input
        type="number"
        step="0.00000001"
        value={valorExclusoesBaseCalculo}
        onChange={(e) => setValorExclusoesBaseCalculo(e.target.value)}
      />

      <button onClick={calcularPisCofins} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {(valorPisCalculado || valorCofinsCalculado) && (
        <div className="result">
          <p><strong>Base de Cálculo PIS:</strong> R$ {baseCalculoPis}</p>
          <p><strong>Alíquota PIS Aplicada:</strong> {aliquotaPisAplicada}%</p>
          <p><strong>Valor PIS:</strong> R$ {valorPisCalculado}</p>

          <p><strong>Base de Cálculo COFINS:</strong> R$ {baseCalculoCofins}</p>
          <p><strong>Alíquota COFINS Aplicada:</strong> {aliquotaCofinsAplicada}%</p>
          <p><strong>Valor COFINS:</strong> R$ {valorCofinsCalculado}</p>

          <p><strong>Regime Final:</strong> {tipoRegimePisCofins}</p>
        </div>
      )}
    </div>
  );
}
