import React, { useState, useMemo } from 'react';

function Home({ produtos, categorias, loading, adicionarAoCarrinho }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const produtosFiltrados = useMemo(() => {
    if (categoriaSelecionada === 'Todos') {
      return produtos;
    }
    return produtos.filter(p => p.categoria === categoriaSelecionada);
  }, [produtos, categoriaSelecionada]);

  const produtosDestaque = useMemo(() => {
    return produtos.filter(p => p.destaque).slice(0, 4);
  }, [produtos]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>☕ <span>Cafeteria do Fundão</span></h1>
        <p>O sabor que vem do fundão, direto para sua xícara!</p>
        <div className="hero-info">
          <span>📍 Fundão, Portugal</span>
          <span>⏰ 8h - 22h</span>
          <span>📞 +351 275 000 000</span>
        </div>
      </section>

      {produtosDestaque.length > 0 && (
        <section className="destaque-section">
          <div className="container">
            <h2>⭐ Produtos em Destaque</h2>
            <div className="produtos-grid">
              {produtosDestaque.map(produto => (
                <div key={produto.id} className="produto-card destaque">
                  <span className="badge-destaque">⭐ Destaque</span>
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome}
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="produto-info">
                    <h3>{produto.nome}</h3>
                    <p>{produto.descricao}</p>
                    <div className="preco">€ {produto.preco.toFixed(2)}</div>
                    <button 
                      className="btn"
                      onClick={() => adicionarAoCarrinho(produto)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="produtos-section">
        <div className="container">
          <h2>📋 Nosso Cardápio</h2>
          
          <div className="categorias">
            {categorias.map(cat => (
              <button
                key={cat.id || cat}
                className={`categoria-btn ${categoriaSelecionada === cat.nome || categoriaSelecionada === cat ? 'active' : ''}`}
                onClick={() => setCategoriaSelecionada(cat.nome || cat)}
              >
                {cat.nome || cat}
              </button>
            ))}
          </div>

          <div className="produtos-grid">
            {produtosFiltrados.map(produto => (
              <div key={produto.id} className="produto-card">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className="produto-info">
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                  <div className="preco">€ {produto.preco.toFixed(2)}</div>
                  {produto.promocao && <span className="badge-promocao">🔥 Promoção</span>}
                  <button 
                    className={`btn ${produto.promocao ? 'btn-promocao' : ''}`}
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="sem-produtos">
              <p>Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
