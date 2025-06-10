import { useState } from 'react';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ICMSDIFAL() {
  const [valorProdutoServico, setValorProdutoServico] = useState('');
  const [valorFrete, setValorFrete] = useState('');
  const [valorSeguro, setValorSeguro] = useState('');
  const [outrasDespesasAcessorias, setOutrasDespesasAcessorias] = useState('');
  const [descontoIncondicional, setDescontoIncondicional] = useState('');
  const [valorIPINaBaseICMS, setValorIPINaBaseICMS] = useState('');
  const [percentualReducaoBaseCalculoICMS, setPercentualReducaoBaseCalculoICMS] = useState('');
  const [aliquotaICMSInternaOrigem, setAliquotaICMSInternaOrigem] = useState('');
  const [aliquotaICMSInterestadual, setAliquotaICMSInterestadual] = useState('');
  const [aliquotaICMSInternaDestino, setAliquotaICMSInternaDestino] = useState('');
  const [percentualFCP, setPercentualFCP] = useState('');
  const [percentualMVA, setPercentualMVA] = useState('');

  const [valorICMSUFDestinoDIFAL, setValorICMSUFDestinoDIFAL] = useState('');
  const [valorICMSUFOrigemDIFAL, setValorICMSUFOrigemDIFAL] = useState('');
  const [percentualFCPDestino, setPercentualFCPDestino] = useState('');
  const [valorFCPDestino, setValorFCPDestino] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calcularICMSDIFAL = async () => {
    setError('');
    setLoading(true);

    try {
      const body = {
        valorProdutoServico,
        valorFrete,
        valorSeguro,
        outrasDespesasAcessorias,
        descontoIncondicional,
        valorIPINaBaseICMS,
        percentualReducaoBaseCalculoICMS,
        aliquotaICMSInternaOrigem,
        aliquotaICMSInterestadual,
        aliquotaICMSInternaDestino,
        percentualFCP,
        percentualMVA,
      };

      const response = await fetch(`${API_URL}/calcular/icmsdifal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${text}`);
      }

      const data = await response.json();

      setValorICMSUFDestinoDIFAL(parseFloat(data.valorICMSUFDestinoDIFAL).toFixed(2));
      setValorICMSUFOrigemDIFAL(parseFloat(data.valorICMSUFOrigemDIFAL).toFixed(2));
      setPercentualFCPDestino(parseFloat(data.percentualFCPDestino).toFixed(2));
      setValorFCPDestino(parseFloat(data.valorFCPDestino).toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cálculo de ICMS DIFAL</h2>

      <label>Valor do Produto/Serviço</label>
      <input type="number" step="0.00000001" value={valorProdutoServico} onChange={(e) => setValorProdutoServico(e.target.value)} />

      <label>Valor do Frete</label>
      <input type="number" step="0.00000001" value={valorFrete} onChange={(e) => setValorFrete(e.target.value)} />

      <label>Valor do Seguro</label>
      <input type="number" step="0.00000001" value={valorSeguro} onChange={(e) => setValorSeguro(e.target.value)} />

      <label>Outras Despesas Acessórias</label>
      <input type="number" step="0.00000001" value={outrasDespesasAcessorias} onChange={(e) => setOutrasDespesasAcessorias(e.target.value)} />

      <label>Desconto Incondicional</label>
      <input type="number" step="0.00000001" value={descontoIncondicional} onChange={(e) => setDescontoIncondicional(e.target.value)} />

      <label>Valor do IPI na Base ICMS</label>
      <input type="number" step="0.00000001" value={valorIPINaBaseICMS} onChange={(e) => setValorIPINaBaseICMS(e.target.value)} />

      <label>Redução da Base de Cálculo (%)</label>
      <input type="number" step="0.0001" value={percentualReducaoBaseCalculoICMS} onChange={(e) => setPercentualReducaoBaseCalculoICMS(e.target.value)} />

      <label>Alíquota ICMS Interna Origem (%)</label>
      <input type="number" step="0.0001" value={aliquotaICMSInternaOrigem} onChange={(e) => setAliquotaICMSInternaOrigem(e.target.value)} />

      <label>Alíquota ICMS Interestadual (%)</label>
      <input type="number" step="0.0001" value={aliquotaICMSInterestadual} onChange={(e) => setAliquotaICMSInterestadual(e.target.value)} />

      <label>Alíquota ICMS Interna Destino (%)</label>
      <input type="number" step="0.0001" value={aliquotaICMSInternaDestino} onChange={(e) => setAliquotaICMSInternaDestino(e.target.value)} />

      <label>Percentual FCP (%)</label>
      <input type="number" step="0.0001" value={percentualFCP} onChange={(e) => setPercentualFCP(e.target.value)} />

      <label>Percentual MVA (%)</label>
      <input type="number" step="0.0001" value={percentualMVA} onChange={(e) => setPercentualMVA(e.target.value)} />

      <button onClick={calcularICMSDIFAL} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {error && <p className="error">{error}</p>}

      {(valorICMSUFDestinoDIFAL || valorICMSUFOrigemDIFAL || valorFCPDestino) && (
        <div className="result">
          <p><strong>Valor ICMS UF Destino (DIFAL):</strong> R$ {valorICMSUFDestinoDIFAL}</p>
          <p><strong>Valor ICMS UF Origem (DIFAL):</strong> R$ {valorICMSUFOrigemDIFAL}</p>
          <p><strong>Percentual FCP Destino:</strong> {percentualFCPDestino}%</p>
          <p><strong>Valor FCP Destino:</strong> R$ {valorFCPDestino}</p>
        </div>
      )}
    </div>
  );
}
