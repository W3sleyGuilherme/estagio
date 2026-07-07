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

const API_URL = 'https://cafeteria-api-lbvd.onrender.com';
const TOKEN = 'b4d929c0308d43267244b2b9b7c11ea8cb823a65f52686391cc1b6f3068ddfb43eec3fb1e55ff1ed85ab993bafab4a4c80e5cdfe90c8cc0ee7e073774baad8dcf585bfda32199c3cca908a663c35720356f17f162ba2d4a82013e1d6e17398bf393006b102fd10c4ee76ee2b0b8447d39947af487d07af65b006c2b0ff18a20d';

console.log('📡 Conectando ao Strapi em:', API_URL);

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

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (e) {}
    }
    
    const userSalvo = localStorage.getItem('user');
    if (userSalvo) {
      try {
        setUser(JSON.parse(userSalvo));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Buscando produtos de:', API_URL);
        
        const response = await api.get('/produtos?populate=*');
        console.log('✅ Produtos recebidos:', response.data);
        
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
            categoria: item.categoria?.nome || 'Sem categoria',
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
          nome: item.nome
        }));
        setCategorias([{ id: 0, nome: 'Todos' }, ...categoriasData]);

      } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        setError(`Erro ao carregar produtos. API: ${API_URL}`);
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
