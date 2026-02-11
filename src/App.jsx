import React, { useState } from "react";
import "./App.css";

function App() {
  // LISTA DE PRODUTOS (depois vem do Strapi)
  const [produtos] = useState([
    {
      id: 1,
      nome: "Café Expresso",
      preco: "5,90",
      imagem: "https://images.unsplash.com/photo-1510707577719-ae7c14805e4c?w=400",
      categoria: "Cafés"
    },
    {
      id: 2,
      nome: "Cappuccino",
      preco: "12,90",
      imagem: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
      categoria: "Cafés"
    },
    {
      id: 3,
      nome: "Pão de Queijo",
      preco: "4,50",
      imagem: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400",
      categoria: "Salgados"
    },
    {
      id: 4,
      nome: "Brownie",
      preco: "8,90",
      imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      categoria: "Doces"
    },
    {
      id: 5,
      nome: "Latte",
      preco: "10,90",
      imagem: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
      categoria: "Cafés"
    },
    {
      id: 6,
      nome: "Croissant",
      preco: "7,50",
      imagem: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
      categoria: "Doces"
    }
  ]);

  const [carrinho, setCarrinho] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  const categorias = ["todos", ...new Set(produtos.map(p => p.categoria))];

  const produtosFiltrados = categoriaAtiva === "todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    alert(`☕ ${produto.nome} adicionado!`);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const total = carrinho.reduce((soma, item) => {
    const preco = parseFloat(item.preco.replace(",", "."));
    return soma + preco;
  }, 0).toFixed(2).replace(".", ",");

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span>☕</span>
              <h1>Coffee<span>Shop</span></h1>
            </div>
            
            <div className="carrinho">
              <button className="btn-carrinho" onClick={() => {
                document.querySelector(".modal-carrinho").style.display = "flex";
              }}>
                🛒 <span className="carrinho-count">{carrinho.length}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>O melhor café da cidade</h2>
            <p>Grãos selecionados, ambiente aconchegante e atendimento especial</p>
            <button className="btn" onClick={() => {
              document.querySelector(".produtos").scrollIntoView({ behavior: "smooth" });
            }}>
              Ver Cardápio
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="categorias">
        <div className="container">
          <div className="categorias-tabs">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`categoria-btn ${categoriaAtiva === cat ? "ativo" : ""}`}
                onClick={() => setCategoriaAtiva(cat)}
              >
                {cat === "todos" ? "Todos" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="produtos">
        <div className="container">
          <h2 className="section-title">🍽️ Nosso Cardápio</h2>
          
          <div className="produtos-grid">
            {produtosFiltrados.map(produto => (
              <div key={produto.id} className="produto-card">
                <img src={produto.imagem} alt={produto.nome} className="produto-img" />
                <div className="produto-info">
                  <span className="produto-categoria">{produto.categoria}</span>
                  <h3 className="produto-nome">{produto.nome}</h3>
                  <p className="produto-preco">R$ {produto.preco}</p>
                  <button 
                    className="btn-add"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL CARRINHO */}
      <div className="modal-carrinho" style={{ display: "none" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>🛒 Seu Carrinho</h3>
            <button className="modal-fechar" onClick={() => {
              document.querySelector(".modal-carrinho").style.display = "none";
            }}>✕</button>
          </div>
          
          <div className="modal-body">
            {carrinho.length === 0 ? (
              <div className="carrinho-vazio">
                <span>🛒</span>
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <>
                {carrinho.map((item, index) => (
                  <div key={index} className="carrinho-item">
                    <div className="carrinho-item-info">
                      <h4>{item.nome}</h4>
                      <span>R$ {item.preco}</span>
                    </div>
                    <button 
                      className="carrinho-remover"
                      onClick={() => removerDoCarrinho(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                <div className="carrinho-total">
                  <strong>Total:</strong>
                  <span>R$ {total}</span>
                </div>
                
                <button className="btn-finalizar">
                  Finalizar Pedido
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <div className="logo">
                <span>☕</span>
                <h3>Coffee<span>Shop</span></h3>
              </div>
              <p>Seu café especial todos os dias</p>
            </div>
            
            <div className="footer-contato">
              <h4>Horário</h4>
              <p>Seg-Sex: 8h às 20h</p>
              <p>Sáb-Dom: 9h às 18h</p>
            </div>
            
            <div className="footer-contato">
              <h4>Contato</h4>
              <p>📞 (11) 9999-9999</p>
              <p>📧 contato@coffeeshop.com</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 CoffeeShop. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;