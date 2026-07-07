import React from 'react';

function Promocoes({ produtos, adicionarAoCarrinho }) {
  const produtosEmPromocao = produtos.filter(p => p.promocao);

  return (
    <div className="promocoes-page">
      <div className="container" style={{ padding: '40px 20px' }}>
        <h1>🔥 Promoções</h1>
        <p>Confira nossas ofertas especiais!</p>

        <div className="produtos-grid">
          {produtosEmPromocao.map(produto => (
            <div key={produto.id} className="produto-card">
              <img src={produto.imagem} alt={produto.nome} />
              <div className="produto-info">
                <h3>{produto.nome}</h3>
                <p>{produto.descricao}</p>
                <div className="preco">R$ {produto.preco.toFixed(2)}</div>
                <span className="badge-promocao">🔥 Promoção</span>
                <button 
                  className="btn btn-promocao"
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {produtosEmPromocao.length === 0 && (
          <p>Nenhum produto em promoção no momento.</p>
        )}
      </div>
    </div>
  );
}

export default Promocoes;
