import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ICMS() {
  const [valorProdutoServico, setValorProdutoServico] = useState('');
  const [valorFrete, setValorFrete] = useState('');
  const [valorSeguro, setValorSeguro] = useState('');
  const [outrasDespesasAcessorias, setOutrasDespesasAcessorias] = useState('');
  const [descontoIncondicional, setDescontoIncondicional] = useState('');
  const [valorIPI, setValorIPI] = useState('');
  const [valorIPINaBaseICMS, setValorIPINaBaseICMS] = useState(false);
  const [percentualReducaoBaseCalculoICMS, setPercentualReducaoBaseCalculoICMS] = useState('');
  const [aliquotaICMSInternaOrigem, setAliquotaICMSInternaOrigem] = useState('');

  const [baseCalculoICMSProprio, setBaseCalculoICMSProprio] = useState('');
  const [aliquotaICMSProprio, setAliquotaICMSProprio] = useState('');
  const [valorICMSProprio, setValorICMSProprio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularICMS = async () => {
    setError('');
    setLoading(true);

    try {
      const body = {
        valorProdutoServico,
        valorFrete,
        valorSeguro,
        outrasDespesasAcessorias,
        descontoIncondicional,
        valorIPI,
        valorIPINaBaseICMS,
        percentualReducaoBaseCalculoICMS,
        aliquotaICMSInternaOrigem,
      };

      const response = await fetch(`${API_URL}/calcular/icms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();

      setBaseCalculoICMSProprio(parseFloat(data.baseCalculoICMSProprio).toFixed(8));
      setAliquotaICMSProprio(parseFloat(data.aliquotaICMSProprio).toFixed(2));
      setValorICMSProprio(parseFloat(data.valorICMSProprio).toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de ICMS Próprio</h2>

      <label>Valor do Produto/Serviço</label>
      <input
        type="number"
        step="0.00000001"
        value={valorProdutoServico}
        onChange={(e) => setValorProdutoServico(e.target.value)}
      />

      <label>Valor do Frete</label>
      <input
        type="number"
        step="0.00000001"
        value={valorFrete}
        onChange={(e) => setValorFrete(e.target.value)}
      />

      <label>Valor do Seguro</label>
      <input
        type="number"
        step="0.00000001"
        value={valorSeguro}
        onChange={(e) => setValorSeguro(e.target.value)}
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

      <label>Valor do IPI</label>
      <input
        type="number"
        step="0.00000001"
        value={valorIPI}
        onChange={(e) => setValorIPI(e.target.value)}
      />

      <label>Redução da Base de Cálculo (%)</label>
      <input
        type="number"
        step="0.00000001"
        value={percentualReducaoBaseCalculoICMS}
        onChange={(e) => setPercentualReducaoBaseCalculoICMS(e.target.value)}
      />

      <label>Alíquota ICMS Interna de Origem (%)</label>
      <input
        type="number"
        step="0.01"
        value={aliquotaICMSInternaOrigem}
        onChange={(e) => setAliquotaICMSInternaOrigem(e.target.value)}
      />

        <label>
        <input
          type="checkbox"
          checked={valorIPINaBaseICMS}
          onChange={(e) => setValorIPINaBaseICMS(e.target.checked)}
        />
        Incluir IPI na base de cálculo do ICMS?
      </label>

      <button onClick={calcularICMS} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {valorICMSProprio && (
        <div className="result">
          <p><strong>Base de Cálculo:</strong> R$ {baseCalculoICMSProprio}</p>
          <p><strong>Alíquota Aplicada:</strong> {aliquotaICMSProprio}%</p>
          <p><strong>Valor ICMS Próprio:</strong> R$ {valorICMSProprio}</p>
        </div>
      )}
    </div>
  );
}
