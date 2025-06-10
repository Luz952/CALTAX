import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ICMSST() {
  const [valorProdutoServico, setValorProdutoServico] = useState('');
  const [valorFrete, setValorFrete] = useState('');
  const [valorSeguro, setValorSeguro] = useState('');
  const [valorIPI, setValorIPI] = useState('');
  const [outrasDespesasAcessorias, setOutrasDespesasAcessorias] = useState('');
  const [descontoIncondicional, setDescontoIncondicional] = useState('');
  const [percentualReducaoBaseCalculoICMS, setPercentualReducaoBaseCalculoICMS] = useState('');
  const [valorIPINaBaseICMS, setValorIPINaBaseICMS] = useState(false);
  const [aliquotaICMSInternaOrigem, setAliquotaICMSInternaOrigem] = useState('');
  const [aliquotaICMSInterestadual, setAliquotaICMSInterestadual] = useState('');
  const [percentualMVA, setPercentualMVA] = useState('');
  const [percentualFCP, setPercentualFCP] = useState('');

  const [baseCalculoICMSST, setBaseCalculoICMSST] = useState('');
  const [valorICMSST, setValorICMSST] = useState('');
  const [aliquotaICMSST, setAliquotaICMSST] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularICMSST = async () => {
    setError('');
    setLoading(true);

    try {
      const body = {
        valorProdutoServico,
        valorFrete,
        valorSeguro,
        valorIPI,
        outrasDespesasAcessorias,
        descontoIncondicional,
        percentualReducaoBaseCalculoICMS,
        valorIPINaBaseICMS,
        aliquotaICMSInternaOrigem,
        aliquotaICMSInterestadual,
        percentualMVA,
        percentualFCP,
      };

      const response = await fetch(`${API_URL}/calcular/icmsst`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();

      setBaseCalculoICMSST(parseFloat(data.baseCalculoICMSST).toFixed(8));
      setValorICMSST(parseFloat(data.valorICMSST).toFixed(2));
      setAliquotaICMSST(parseFloat(data.aliquotaICMSST).toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de ICMS-ST</h2>

      <label>Valor do Produto/Serviço</label>
      <input type="number" step="0.00000001" value={valorProdutoServico} onChange={(e) => setValorProdutoServico(e.target.value)} />

      <label>Valor do Frete</label>
      <input type="number" step="0.00000001" value={valorFrete} onChange={(e) => setValorFrete(e.target.value)} />

      <label>Valor do Seguro</label>
      <input type="number" step="0.00000001" value={valorSeguro} onChange={(e) => setValorSeguro(e.target.value)} />

      <label>Valor do IPI</label>
      <input type="number" step="0.00000001" value={valorIPI} onChange={(e) => setValorIPI(e.target.value)} />

      <label>Outras Despesas Acessórias</label>
      <input type="number" step="0.00000001" value={outrasDespesasAcessorias} onChange={(e) => setOutrasDespesasAcessorias(e.target.value)} />

      <label>Desconto Incondicional</label>
      <input type="number" step="0.00000001" value={descontoIncondicional} onChange={(e) => setDescontoIncondicional(e.target.value)} />

      <label>Redução da Base de Cálculo (%)</label>
      <input type="number" step="0.00000001" value={percentualReducaoBaseCalculoICMS} onChange={(e) => setPercentualReducaoBaseCalculoICMS(e.target.value)} />

      <label>Alíquota ICMS Interna de Origem (%)</label>
      <input type="number" step="0.01" value={aliquotaICMSInternaOrigem} onChange={(e) => setAliquotaICMSInternaOrigem(e.target.value)} />

      <label>Alíquota ICMS Interestadual (%)</label>
      <input type="number" step="0.01" value={aliquotaICMSInterestadual} onChange={(e) => setAliquotaICMSInterestadual(e.target.value)} />

      <label>Percentual de MVA (%)</label>
      <input type="number" step="0.01" value={percentualMVA} onChange={(e) => setPercentualMVA(e.target.value)} />

      <label>Percentual de FCP (%)</label>
      <input type="number" step="0.01" value={percentualFCP} onChange={(e) => setPercentualFCP(e.target.value)} />

      <label>
        <input type="checkbox" checked={valorIPINaBaseICMS} onChange={(e) => setValorIPINaBaseICMS(e.target.checked)} />
        Incluir IPI na base de cálculo do ICMS?
      </label>

      <button onClick={calcularICMSST} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {valorICMSST && (
        <div className="result">
          <p><strong>Base de Cálculo ST:</strong> R$ {baseCalculoICMSST}</p>
          <p><strong>Valor do ICMS-ST:</strong> R$ {valorICMSST}</p>
          <p><strong>Alíquota ICMS-ST:</strong> {aliquotaICMSST}%</p>
        </div>
      )}
    </div>
  );
}
