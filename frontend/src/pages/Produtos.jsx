import React, { useState } from 'react';

function Produtos({ produtos, categorias, adicionarAoCarrinho }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const produtosFiltrados = categoriaSelecionada === 'Todos'
    ? produtos
    : produtos.filter(p => p.categoria === categoriaSelecionada);

  return (
    <div className="produtos-page">
      <div className="container" style={{ padding: '40px 20px' }}>
        <h1>Nossos Produtos</h1>
        
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
    </div>
  );
}

export default Produtos;
