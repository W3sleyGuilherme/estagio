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
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

// Usar variável de ambiente ou fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
const TOKEN = import.meta.env.VITE_API_TOKEN || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
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
  const [user, setUser] = useState(null);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (e) {
        console.error('Erro ao carregar carrinho:', e);
      }
    }
    
    const userSalvo = localStorage.getItem('user');
    if (userSalvo) {
      try {
        setUser(JSON.parse(userSalvo));
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Carregar dados do Strapi
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
              imagemUrl = `${API_URL}${img.url}`;
            }
          } else if (item.imagem && item.imagem.url) {
            imagemUrl = `${API_URL}${item.imagem.url}`;
          }
          
          return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco,
            categoria: item.categoria?.Categoria || item.categoria?.nome || 'Sem categoria',
            categoriaId: item.categoria?.id || null,
            imagem: imagemUrl,
            destaque: item.destaque || false,
            promocao: item.promocao || false,
          };
        });
        
        setProdutos(produtosData);

        const catResponse = await api.get('/categorias');
        const categoriasData = catResponse.data.data.map(item => ({
          id: item.id,
          nome: item.Categoria || item.nome
        }));
        setCategorias([{ id: 0, nome: 'Todos' }, ...categoriasData]);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar produtos. Verifique se o Strapi está rodando.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

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
    localStorage.removeItem('carrinho');
  };

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>⚠️ Erro ao carregar dados</h2>
        <p>{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header 
          carrinhoCount={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
          onCarrinhoClick={() => setShowCarrinho(true)}
          user={user}
          onLogout={handleLogout}
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
          <Route path="/agendamento" element={<Agendamento user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
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
