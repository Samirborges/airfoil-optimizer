import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import aviaoHero from '../../img/AviaoHero.png';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/forms', { state: { searchQuery } });
    } else {
      navigate('/forms');
    }
  };

  const handleGetStarted = () => {
    navigate('/forms');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Transforme desenhos em <br />
              perfis aerodinâmicos <br />
              prontos para voo
            </h1>
            <p className="hero-description">
              Envie uma imagem do perfil, receba a correspondência com perfis conhecidos, visualize
              melhorias e exporte resultados em SVG/CSV.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={handleGetStarted}>
                Quero testar
              </button>
              <button className="btn-secondary">
                Ver documentação
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="airplane-container">
              {/* Representação visual do avião com anotações */}
              <div className="airplane-illustration">
                <img 
                  src={aviaoHero} 
                  alt="Avião Hero - AeroProfile AI" 
                  className="airplane-hero-image"
                />
                
                {/* Anotações */}
                <div className="annotation recognition">
                  <div className="annotation-icon">🔍</div>
                  <span>Reconhecimento automático</span>
                </div>
                
                <div className="annotation profile-match">
                  <div className="annotation-icon">📐</div>
                  <span>Correspondência de perfis</span>
                </div>
                
                <div className="annotation suggestions">
                  <div className="annotation-icon">💡</div>
                  <span>Sugestões aerodinâmicas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="search-section">
          <h2>O que você quer otimizar?</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Digite o que você deseja otimizar no seu perfil"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="search-btn">
              Começar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;