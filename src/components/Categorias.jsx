// src/components/Categorias.jsx
import React from 'react';

export function Categorias({ categorias, categoriaAtiva, setCategoriaAtiva }) {
  return (
    <section className="categorias">
      <div className="container">
        <div className="categorias-tabs">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`categoria-btn ${categoriaAtiva === cat ? "ativo" : ""}`}
              onClick={() => setCategoriaAtiva(cat)}
            >
              {cat === "todos" ? "📋 Todos" : 
               cat === "Cafés" ? "☕ Cafés" :
               cat === "Salgados" ? "🥐 Salgados" :
               cat === "Doces" ? "🍰 Doces" : "🥤 Bebidas"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}