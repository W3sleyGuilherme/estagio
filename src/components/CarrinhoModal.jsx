// src/components/CarrinhoModal.jsx
import React from 'react';

export function CarrinhoModal({ 
  modalAberto, 
  setModalAberto, 
  carrinho, 
  removerDoCarrinho, 
  total, 
  limparCarrinho,
  modalRef 
}) {
  if (!modalAberto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo" ref={modalRef}>
        <div className="modal-cabecalho">
          <h3>
            🛒 Carrinho de Compras
            {carrinho.length > 0 && (
              <span className="modal-total-items">{carrinho.length} itens</span>
            )}
          </h3>
          <button 
            className="modal-fechar"
            onClick={() => setModalAberto(false)}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        
        <div className="modal-corpo">
          {carrinho.length === 0 ? (
            <div className="carrinho-vazio">
              <span className="carrinho-vazio-icone">🛒</span>
              <p>Seu carrinho está vazio</p>
              <p className="carrinho-vazio-sub">Adicione alguns produtos deliciosos!</p>
              <button 
                className="btn-continuar"
                onClick={() => setModalAberto(false)}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="carrinho-itens">
                {carrinho.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="carrinho-item">
                    <div className="carrinho-item-info">
                      <h4 className="carrinho-item-nome">{item.nome}</h4>
                      <span className="carrinho-item-preco">R$ {item.preco}</span>
                    </div>
                    <button 
                      className="carrinho-remover"
                      onClick={() => removerDoCarrinho(index)}
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="carrinho-resumo">
                <div className="carrinho-total">
                  <span>Total:</span>
                  <strong>R$ {total}</strong>
                </div>
                
                <div className="carrinho-acoes">
                  <button 
                    className="btn-limpar"
                    onClick={limparCarrinho}
                  >
                    Limpar Carrinho
                  </button>
                  <button className="btn-finalizar">
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}