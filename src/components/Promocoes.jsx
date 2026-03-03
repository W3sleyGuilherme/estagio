// src/components/Promocoes.jsx
import React, { useState, useEffect } from 'react';
import { ProdutoCard } from './ProdutoCard';

export function Promocoes({ adicionarAoCarrinho }) {
  const [promocoes, setPromocoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diasRestantes, setDiasRestantes] = useState(3);

  useEffect(() => {
    buscarPromocoes();
    // Atualiza a cada 3 dias (em milissegundos)
    const intervalo = setInterval(() => {
      buscarPromocoes();
    }, 3 * 24 * 60 * 60 * 1000); // 3 dias

    return () => clearInterval(intervalo);
  }, []);

  const buscarPromocoes = async () => {
    try {
      setLoading(true);
      // Busca produtos com promocao = true
      const response = await fetch('http://localhost:1337/api/produtos?filters[promocao][$eq]=true&populate=*');
      const data = await response.json();
      
      // Filtra apenas promoções ativas (data_fim_promocao > hoje)
      const hoje = new Date();
      const promosAtivas = data.data.filter(item => {
        if (!item.attributes.data_fim_promocao) return true;
        return new Date(item.attributes.data_fim_promocao) > hoje;
      });

      setPromocoes(promosAtivas);
      
      // Calcula dias até próxima atualização
      const proximaAtualizacao = new Date();
      proximaAtualizacao.setDate(proximaAtualizacao.getDate() + 3);
      const diff = proximaAtualizacao - new Date();
      setDiasRestantes(Math.ceil(diff / (1000 * 60 * 60 * 24)));
      
    } catch (error) {
      console.error('Erro ao buscar promoções:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="promocoes">
        <div className="container">
          <div className="loading-spinner">Carregando promoções...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="promocoes">
      <div className="container">
        <div className="promocoes-header">
          <h2 className="section-title">
            🔥 Promoções Especiais
            <span className="promocoes-badge">
              Atualiza em {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}
            </span>
          </h2>
          <p className="promocoes-subtitle">
            Ofertas imperdíveis por tempo limitado!
          </p>
        </div>

        {promocoes.length === 0 ? (
          <div className="sem-promocoes">
            <span>🎁</span>
            <p>Nenhuma promoção no momento</p>
            <p className="sem-promocoes-sub">Volte em breve para novas ofertas!</p>
          </div>
        ) : (
          <div className="promocoes-grid">
            {promocoes.map(item => {
              const produto = {
                id: item.id,
                nome: item.attributes.nome,
                descricao: item.attributes.descricao,
                preco: item.attributes.preco.toFixed(2).replace('.', ','),
                preco_promocional: item.attributes.preco_promocional?.toFixed(2).replace('.', ','),
                imagem: item.attributes.imagem?.data?.attributes?.url 
                  ? `http://localhost:1337${item.attributes.imagem.data.attributes.url}`
                  : 'https://images.unsplash.com/photo-1510707577719-ae7c14805e4c?w=400',
                categoria: item.attributes.categoria?.data?.attributes?.nome || 'Outros'
              };

              return (
                <div key={item.id} className="promocao-card">
                  <div className="promocao-tag">🔥 PROMO</div>
                  <ProdutoCard 
                    produto={produto}
                    adicionarAoCarrinho={adicionarAoCarrinho}
                  />
                  {produto.preco_promocional && (
                    <div className="promocao-precos">
                      <span className="preco-antigo">R$ {produto.preco}</span>
                      <span className="preco-novo">R$ {produto.preco_promocional}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="promocoes-footer">
          <p>🚀 Próxima atualização em {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}</p>
        </div>
      </div>
    </section>
  );
}