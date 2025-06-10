import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function IPI() {
  const [valorProduto, setValorProduto] = useState('');
  const [aliquotaIPI, setAliquotaIPI] = useState('');
  const [frete, setFrete] = useState('');
  const [seguro, setSeguro] = useState('');
  const [outrasDespesasAcessorias, setOutrasDespesasAcessorias] = useState('');
  const [descontoIncondicional, setDescontoIncondicional] = useState('');

  const [baseCalculoIPI, setBaseCalculoIPI] = useState('');
  const [aliquotaAplicada, setAliquotaAplicada] = useState('');
  const [valorIPI, setValorIPI] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularIPI = async () => {
    setError('');
    setLoading(true);

    try {
      const body = {
        valorProduto,
        aliquotaIPI,
        frete,
        seguro,
        outrasDespesasAcessorias,
        descontoIncondicional,
      };

      const response = await fetch(`${API_URL}/calcular/ipi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();

      setBaseCalculoIPI(parseFloat(data.baseCalculoIPI).toFixed(8));
      setAliquotaAplicada(parseFloat(data.aliquotaIpiAplicada).toFixed(2));
      setValorIPI(parseFloat(data.valorIpiCalculado).toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de IPI</h2>

      <label>Valor do Produto</label>
      <input
        type="number"
        step="0.00000001"
        value={valorProduto}
        onChange={(e) => setValorProduto(e.target.value)}
      />

      <label>Alíquota do IPI (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaIPI}
        onChange={(e) => setAliquotaIPI(e.target.value)}
      />

      <label>Valor do Frete</label>
      <input
        type="number"
        step="0.00000001"
        value={frete}
        onChange={(e) => setFrete(e.target.value)}
      />

      <label>Valor do Seguro</label>
      <input
        type="number"
        step="0.00000001"
        value={seguro}
        onChange={(e) => setSeguro(e.target.value)}
      />

      <label>Outras Despesas Acessórias</label>
      <input
        type="number"
        step="0.00000001"
        value={outrasDespesasAcessorias}
        onChange={(e) => setOutrasDespesasAcessorias(e.target.value)}
      />

      <label>Desconto Incondicional</label>
      <input
        type="number"
        step="0.00000001"
        value={descontoIncondicional}
        onChange={(e) => setDescontoIncondicional(e.target.value)}
      />

      <button onClick={calcularIPI} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {valorIPI && (
        <div className="result">
          <p><strong>Base de Cálculo:</strong> R$ {baseCalculoIPI}</p>
          <p><strong>Alíquota Aplicada:</strong> {aliquotaAplicada}%</p>
          <p><strong>Valor do IPI:</strong> R$ {valorIPI}</p>
        </div>
      )}
    </div>
  );
}
