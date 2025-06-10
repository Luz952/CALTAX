import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function IBS() {
  const [valorLiquido, setValorLiquido] = useState('');
  const [aliquotaIBS, setAliquotaIBS] = useState('');
  const [valorIBS, setValorIBS] = useState('');
  const [valorBruto, setValorBruto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularIBS = async () => {
    setError('');
    const liquido = valorLiquido.trim();
    const aliquota = aliquotaIBS.trim();

    if (!liquido || !aliquota || isNaN(Number(liquido)) || isNaN(Number(aliquota))) {
      setError('Preencha os campos corretamente.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/calcular/ibs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valorLiquido: liquido,
          aliquotaIBS: aliquota,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();
      setValorIBS(parseFloat(data.valorIBS).toFixed(2));
      setValorBruto(parseFloat(data.valorBruto).toFixed(8));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de IBS</h2>

      <label>Valor Líquido</label>
      <input
        type="number"
        step="0.00000001"
        value={valorLiquido}
        onChange={(e) => setValorLiquido(e.target.value)}
      />

      <label>Alíquota IBS (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaIBS}
        onChange={(e) => setAliquotaIBS(e.target.value)}
      />

      <button onClick={calcularIBS} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {valorIBS && valorBruto && (
        <div className="result">
          <p><strong>Valor IBS:</strong> R$ {valorIBS}</p>
          <p><strong>Valor Bruto:</strong> R$ {valorBruto}</p>
        </div>
      )}
    </div>
  );
}
