import React from 'react';

function CarrinhoModal({ 
  isOpen, 
  onClose, 
  carrinho, 
  onRemover, 
  onAtualizarQuantidade,
  onLimpar,
  total 
}) {
  if (!isOpen) return null;

  const finalizarCompra = () => {
    alert('🎉 Pedido finalizado com sucesso!\n\nObrigado por escolher Café & Co.');
    onLimpar();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>🛒 Seu Carrinho</h2>

        {carrinho.length === 0 ? (
          <div className="carrinho-vazio">
            <p>Seu carrinho está vazio</p>
            <button className="btn" onClick={onClose}>Explorar Cardápio</button>
          </div>
        ) : (
          <>
            <div className="carrinho-items">
              {carrinho.map(item => (
                <div key={item.id} className="carrinho-item">
                  <div>
                    <h4>{item.nome}</h4>
                    <p>R$ {item.preco.toFixed(2)}</p>
                  </div>
                  <div className="item-quantidade">
                    <button onClick={() => onAtualizarQuantidade(item.id, item.quantidade - 1)}>−</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => onAtualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
                  </div>
                  <button className="remover-item" onClick={() => onRemover(item.id)}>🗑️</button>
                </div>
              ))}
            </div>

            <div className="carrinho-total">
              <h3>Total: R$ {total.toFixed(2)}</h3>
            </div>

            <div className="carrinho-acoes">
              <button className="btn btn-outline" onClick={onLimpar}>Limpar</button>
              <button className="btn btn-promocao" onClick={finalizarCompra}>
                ✅ Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CarrinhoModal;
