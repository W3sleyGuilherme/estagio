// src/components/ProdutoCard.jsx
import React from 'react';

export function ProdutoCard({ produto, adicionarAoCarrinho }) {
  return (
    <div className="produto-card">
      <div className="produto-imagem-container">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="produto-imagem"
          loading="lazy"
        />
      </div>
      <div className="produto-info">
        <span className="produto-categoria">{produto.categoria}</span>
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>
        <div className="produto-footer">
          <span className="produto-preco">R$ {produto.preco}</span>
          <button 
            className="btn-adicionar"
            onClick={() => adicionarAoCarrinho(produto)}
            aria-label={`Adicionar ${produto.nome} ao carrinho`}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}