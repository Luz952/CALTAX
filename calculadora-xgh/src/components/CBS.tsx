import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function CBS() {
  const [valorLiquido, setValorLiquido] = useState('');
  const [aliquotaCBS, setAliquotaCBS] = useState('');
  const [valorCBS, setValorCBS] = useState('');
  const [valorBruto, setValorBruto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const calcularCBS = async () => {
  setError('');
  const liquido = valorLiquido.trim();
  const aliquota = aliquotaCBS.trim();

  if (!liquido || !aliquota || isNaN(Number(liquido)) || isNaN(Number(aliquota))) {
    setError('Preencha os campos corretamente.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/calcular/cbs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valorLiquido: liquido,     
        aliquotaCBS: aliquota,      
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro na API: ${response.status} - ${text}`);
    }

    const data = await response.json();
    setValorCBS(parseFloat(data.valorCBS).toFixed(2));
    setValorBruto(parseFloat(data.valorBruto).toFixed(8));
  } catch (err: any) {
    setError(err.message || 'Erro desconhecido');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de CBS</h2>

      <label>Valor Líquido</label>
      <input
        type="number"
        step="0.00000001"
        value={valorLiquido}
        onChange={(e) => setValorLiquido(e.target.value)}
      />

      <label>Alíquota CBS (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaCBS}
        onChange={(e) => setAliquotaCBS(e.target.value)}
      />

      <button onClick={calcularCBS} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {valorCBS && valorBruto && (
        <div className="result">
          <p><strong>Valor CBS:</strong> R$ {valorCBS}</p>
          <p><strong>Valor Bruto:</strong> R$ {valorBruto}</p>
        </div>
      )}
    </div>
  );
}
