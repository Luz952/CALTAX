import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ISS() {
  const [valorServico, setValorServico] = useState('');
  const [aliquotaISS, setAliquotaISS] = useState('');

  const [valorISSCalculado, setValorISSCalculado] = useState('');
  const [valorServicoSemISS, setValorServicoSemISS] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularISS = async () => {
    setError('');
    setLoading(true);

    try {
      const body = {
        valorServico,
        aliquotaISS,
      };

      const response = await fetch(`${API_URL}/calcular/iss`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();

      setValorISSCalculado(parseFloat(data.valorISSCalculado).toFixed(2));
      setValorServicoSemISS(parseFloat(data.valorServicoSemISS).toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de ISS</h2>

      <label>Valor do Serviço</label>
      <input
        type="number"
        step="0.00000001"
        value={valorServico}
        onChange={(e) => setValorServico(e.target.value)}
      />

      <label>Alíquota do ISS (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaISS}
        onChange={(e) => setAliquotaISS(e.target.value)}
      />

      <button onClick={calcularISS} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {valorISSCalculado && (
        <div className="result">
          <p><strong>Valor ISS Calculado:</strong> R$ {valorISSCalculado}</p>
          <p><strong>Valor do Serviço sem ISS:</strong> R$ {valorServicoSemISS}</p>
        </div>
      )}
    </div>
  );
}
