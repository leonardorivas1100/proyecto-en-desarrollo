import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div>
        <h1>Hola amigo</h1>
        <button>
          <ul className="nav-list">
        <li className="nav-item" onClick={() => navigate('/login')}>
          INICIAR
        </li>
      </ul>
        </button>
    </div>
    
  );
};

export default HomePage;
