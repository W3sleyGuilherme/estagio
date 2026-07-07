import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import CarrinhoModal from './components/CarrinhoModal';
import Promocoes from './components/Promocoes';
import Agendamento from './components/Agendamento';
import './App.css';

const TOKEN = "728312dd4494e7eef7d8db7bd2a2a18eddee13a231b8c23879e44c8bd4f236b5cac25cd9fe57cd87fdab242f6c7b611cd06cda7201d539e9ac988583728e44cba7128848e55d22816ed43f692f673a571fdc65e0481093594e6fb2f53feb31e31fcbb19afdd835ee5826ea5fb4fe1e80821c0e1a0fdad872aa7f07cc81f7a73d";

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  },
});

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/produtos?populate=*');
        console.log('Produtos recebidos:', response.data);
        
        const produtosData = response.data.data.map(item => {
          let imagemUrl = '/placeholder.jpg';
          if (item.imagem && Array.isArray(item.imagem) && item.imagem.length > 0) {
            const img = item.imagem[0];
            if (img && img.url) {
              imagemUrl = `http://localhost:1337${img.url}`;
            }
          } else if (item.imagem && item.imagem.url) {
            imagemUrl = `http://localhost:1337${item.imagem.url}`;
          }
          
          return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco,
            categoria: item.categoria?.Categoria || item.categoria?.nome || 'Sem categoria',
            imagem: imagemUrl,
            destaque: item.destaque || false,
            promocao: item.promocao || false,
          };
        });
        
        setProdutos(produtosData);

        const catResponse = await api.get('/categorias');
        const categoriasData = catResponse.data.data.map(item => item.Categoria || item.nome);
        setCategorias(['Todos', ...categoriasData]);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar produtos. Verifique se o Strapi está rodando.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []); // Array vazio = executa apenas uma vez

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(prev => prev.filter(item => item.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }
    setCarrinho(prev =>
      prev.map(item =>
        item.id === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>⚠️ Erro ao carregar dados</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header 
          carrinhoCount={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
          onCarrinhoClick={() => setShowCarrinho(true)}
        />
        
        <Routes>
          <Route path="/" element={
            <Home 
              produtos={produtos}
              categorias={categorias}
              loading={loading}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          } />
          <Route path="/produtos" element={
            <Produtos 
              produtos={produtos}
              categorias={categorias}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          } />
          <Route path="/promocoes" element={
            <Promocoes 
              produtos={produtos.filter(p => p.promocao)}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          } />
          <Route path="/agendamento" element={<Agendamento />} />
        </Routes>

        <CarrinhoModal
          isOpen={showCarrinho}
          onClose={() => setShowCarrinho(false)}
          carrinho={carrinho}
          onRemover={removerDoCarrinho}
          onAtualizarQuantidade={atualizarQuantidade}
          onLimpar={limparCarrinho}
          total={totalCarrinho}
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
