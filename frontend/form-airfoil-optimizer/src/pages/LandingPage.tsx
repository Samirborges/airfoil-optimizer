import Header from '../components/common/Header';
import HeroSection from '../components/common/HeroSection';
import BenefitsSection from '../components/common/BenefitsSection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Otimizador de Perfil de Asa</h3>
              <p>Produzido por: Alunos da Universidades Tiradentes</p>
              <p>Grupo: Corvos Aerodesign</p>
            </div>
            <div className="footer-contact">
              <h4>Dúvidas? Envie uma mensagem</h4>
              <div className="contact-form">
                <input 
                  type="text" 
                  placeholder="Digite algo..." 
                  className="contact-input"
                />
                <button className="contact-btn">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;