// src/App.jsx - Versão Melhorada COM COMPONENTES E PROMOÇÕES
import React, { useState, useEffect, useRef } from "react";
import { produtos } from "./data/produtos";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Categorias } from "./components/Categorias";
import { ProdutoCard } from "./components/ProdutoCard";
import { CarrinhoModal } from "./components/CarrinhoModal";
import { Promocoes } from "./components/Promocoes";
import { Agendamento } from "./components/Agendamento";
import "./App.css";

function App() {
  // ========== ESTADOS ==========
  const [carrinho, setCarrinho] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [notificacao, setNotificacao] = useState({ mostrar: false, mensagem: '' });
  const modalRef = useRef(null);
  
  // Estado para controlar se está usando dados do Strapi ou locais
  const [usarStrapi, setUsarStrapi] = useState(false);
  const [produtosStrapi, setProdutosStrapi] = useState([]);

  // ========== BUSCAR PRODUTOS DO STRAPI (OPCIONAL) ==========
  useEffect(() => {
    // Descomente esta parte quando o Strapi estiver pronto
    /*
    const buscarProdutos = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/produtos?populate=categoria,imagem');
        const data = await response.json();
        
        const produtosFormatados = data.data.map(item => ({
          id: item.id,
          nome: item.attributes.nome,
          preco: item.attributes.preco.toFixed(2).replace('.', ','),
          preco_promocional: item.attributes.preco_promocional?.toFixed(2).replace('.', ','),
          imagem: item.attributes.imagem?.data?.attributes?.url 
            ? `http://localhost:1337${item.attributes.imagem.data.attributes.url}`
            : 'https://images.unsplash.com/photo-1510707577719-ae7c14805e4c?w=400',
          categoria: item.attributes.categoria?.data?.attributes?.nome || 'Outros',
          descricao: item.attributes.descricao,
          promocao: item.attributes.promocao || false,
          data_fim_promocao: item.attributes.data_fim_promocao
        }));
        
        setProdutosStrapi(produtosFormatados);
        setUsarStrapi(true);
      } catch (error) {
        console.error('Erro ao buscar produtos do Strapi:', error);
        setUsarStrapi(false);
      }
    };
    
    buscarProdutos();
    */
  }, []);

  // ========== FUNÇÕES AUXILIARES ==========
  const produtosAtivos = usarStrapi ? produtosStrapi : produtos;
  
  const categorias = ["todos", ...new Set(produtosAtivos.map(p => p.categoria))];
  
  const produtosFiltrados = categoriaAtiva === "todos" 
    ? produtosAtivos 
    : produtosAtivos.filter(p => p.categoria === categoriaAtiva);

  // ========== FUNÇÕES DO CARRINHO ==========
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    mostrarNotificacao(`☕ ${produto.nome} adicionado ao carrinho!`);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    const itemRemovido = novoCarrinho[index];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
    mostrarNotificacao(`🗑️ ${itemRemovido.nome} removido do carrinho`);
  };

  const limparCarrinho = () => {
    if (carrinho.length > 0) {
      setCarrinho([]);
      mostrarNotificacao('🛒 Carrinho limpo com sucesso!');
    }
  };

  const mostrarNotificacao = (mensagem) => {
    setNotificacao({ mostrar: true, mensagem });
    setTimeout(() => {
      setNotificacao({ mostrar: false, mensagem: '' });
    }, 2000);
  };

  // Calcular total do carrinho
  const total = carrinho.reduce((soma, item) => {
    const preco = parseFloat(item.preco.replace(",", "."));
    return soma + preco;
  }, 0).toFixed(2).replace(".", ",");

  // Fechar modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      {/* NOTIFICAÇÃO FLUTUANTE */}
      {notificacao.mostrar && (
        <div className="notificacao">
          {notificacao.mensagem}
        </div>
      )}

      {/* HEADER */}
      <Header carrinho={carrinho} setModalAberto={setModalAberto} />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>O melhor café da cidade</h2>
            <p>Grãos selecionados, ambiente aconchegante e atendimento especial</p>
            <button 
              className="btn-hero"
              onClick={() => {
                document.querySelector(".promocoes").scrollIntoView({ 
                  behavior: "smooth" 
                });
              }}
            >
              Ver Promoções
            </button>
          </div>
        </div>
      </section>

      {/* PROMOÇÕES EM DESTAQUE */}
      <Promocoes 
        adicionarAoCarrinho={adicionarAoCarrinho}
        produtos={produtosAtivos}
      />

      {/* CATEGORIAS */}
      <Categorias 
        categorias={categorias}
        categoriaAtiva={categoriaAtiva}
        setCategoriaAtiva={setCategoriaAtiva}
      />

      {/* PRODUTOS */}
      <section className="produtos">
        <div className="container">
          <h2 className="section-title">
            {categoriaAtiva === "todos" ? "🍽️ Nosso Cardápio" : 
             `🍽️ ${categoriaAtiva}`}
          </h2>
          
          <div className="produtos-grid">
            {produtosFiltrados.map(produto => (
              <ProdutoCard 
                key={produto.id}
                produto={produto}
                adicionarAoCarrinho={adicionarAoCarrinho}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DO CARRINHO */}
      <CarrinhoModal 
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
        carrinho={carrinho}
        removerDoCarrinho={removerDoCarrinho}
        total={total}
        limparCarrinho={limparCarrinho}
        modalRef={modalRef}
      />

      {/* AGENDAMENTO DE RESERVAS */}
      <Agendamento />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;