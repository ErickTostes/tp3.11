import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (email.trim() === '' || password.trim() === '') {
      toast.error('Preencha todos os campos.');
      return;
    }
  
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
    const userExists = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );
  
    if (userExists) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!');
      navigate('/home');
    } else {
      toast.error('Credenciais inválidas.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
        <p>
          <span onClick={() => navigate('/password-reset')} className="link">Esqueceu a senha?</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
