import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToFavorites = () => {
    navigate('/favorites');
  };

  const toggleFavorite = (productId) => {
    let updatedFavorites;
    if (favorites.includes(productId)) {
      updatedFavorites = favorites.filter(id => id !== productId);
    } else {
      updatedFavorites = [...favorites, productId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Catálogo de Produtos</h1>
      <div className="home-buttons">
        <button onClick={goToProfile}>Perfil</button>
        <button onClick={goToFavorites}>Favoritos</button> {/* Botão para navegar para a página de favoritos */}
        <button onClick={handleLogout}>Sair</button>
      </div>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Preço:</strong> ${product.price}</p>
            <button onClick={() => toggleFavorite(product.id)}>
              {favorites.includes(product.id) ? 'Desmarcar Favorito' : 'Marcar como Favorito'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
