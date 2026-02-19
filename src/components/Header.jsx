// src/components/Header.jsx
import React from 'react';

export function Header({ carrinho, setModalAberto }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icone">☕</span>
            <h1 className="logo-titulo">Coffee<span>Shop</span></h1>
          </div>
          
          <div className="header-acoes">
            <button 
              className="btn-carrinho"
              onClick={() => setModalAberto(true)}
              aria-label="Abrir carrinho"
            >
              🛒
              {carrinho.length > 0 && (
                <span className="carrinho-count">{carrinho.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}