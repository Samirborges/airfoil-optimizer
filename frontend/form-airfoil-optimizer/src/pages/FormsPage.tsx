import { useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Slider from "../components/ui/Slider";
import AirplaneVisualization from "../components/ui/AirplaneVisualization";
import type { ConfigObject } from "../types";
import { v4 as uuidv4 } from "uuid";
// import { Camera, Pencil, Send } from "lucide-react";
import { Camera, Send } from "lucide-react";
import imagemSelecionarModelo from "../img/imagem-selecionar-modelo.png";
// import desenharPerfil from "../img/desenhar-perfil.png";
import "./FormsPage.css";

const FormsPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";
  const navigate = useNavigate();

  const [config, setConfig] = useState<ConfigObject>({
    img: "placeholder-url",
    envergadura: 0,
    cordaMedia: 0,
    pesoEstimado: 0,
    velocidadeCruzeiro: 0,
    altitude: 0,
  });

  const [formData, setFormData] = useState({
    envergadura: 0,
    cordaMedia: 0,
    pesoEstimado: 0,
    velocidadeCruzeiro: 0,
    altitude: 0,
  });

  const [uploadedImage, setUploadedImagem] = useState<string>(
    "/src/img/imagem-selecionar-modelo.png"
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeUploadMethod, setActiveUploadMethod] = useState<
    "photo" | "draw" | null
  >(null);

  const handleSliderChange = (name: string, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickInvitePhoto = () => {
    setActiveUploadMethod("photo");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagem(reader.result as string);
        setConfig((prevConfig) => ({
          ...prevConfig,
          img: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleClickMakeDraw = () => {
  //   setActiveUploadMethod("draw");
  //   setConfig((prevConfig) => ({
  //     ...prevConfig,
  //     img: "imagem-direita-selecionada.png",
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.envergadura ||
      !formData.cordaMedia ||
      !formData.pesoEstimado ||
      !formData.velocidadeCruzeiro
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const sessionId = uuidv4();

    const dataPayload = {
      envergadura: formData.envergadura,
      cordaMedia: formData.cordaMedia,
      pesoEstimado: formData.pesoEstimado,
      velocidadeCruzeiro: formData.velocidadeCruzeiro,
      altitude: formData.altitude || 0,
    };

    const imagePayload = {
      img: config.img,
    };

    setConfig((prevConfig) => ({
      ...prevConfig,
      ...dataPayload,
    }));

    console.log("Objeto de configuração atualizado:", dataPayload);

    try {
      const dataResponse = await fetch(
        `http://127.0.0.1:8000/input/airfoil-data/?session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPayload),
        }
      );

      const imageResponse = await fetch(
        `http://127.0.0.1:8000/upload/imagem/?session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imagePayload),
        }
      );

      if (dataResponse.ok && imageResponse.ok) {
        const debugResponse = await fetch(
          `http://127.0.0.1:8000/optimize/debug/${sessionId}`
        );
        const debugResult = await debugResponse.json();
        console.log("Payload consolidado:", debugResult);
        navigate("/results", { state: { payload: debugResult } });
        alert(
          "Dados enviados com sucesso! Verifique o console e o terminal do servidor."
        );
      } else {
        alert("Erro ao enviar dados para um ou mais endpoints.");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleReset = () => {
    setFormData({
      envergadura: 0,
      cordaMedia: 0,
      pesoEstimado: 0,
      velocidadeCruzeiro: 0,
      altitude: 0,
    });
    setConfig((prevConfig) => ({
      ...prevConfig,
      envergadura: 0,
      cordaMedia: 0,
      pesoEstimado: 0,
      velocidadeCruzeiro: 0,
      altitude: 0,
    }));
    setUploadedImagem("https://placehold.co/405x371");
    setActiveUploadMethod(null);
  };

  return (
    <div className="forms-page">
      <Header />

      <div className="forms-container">
        <div className="breadcrumb">
          <Link to="/">AeroProfile AI</Link>
          <span>—</span>
          <span>Otimizador de Perfis de Asa</span>
        </div>

        {searchQuery && (
          <div className="search-context">
            <p>
              Otimizando baseado em: <strong>"{searchQuery}"</strong>
            </p>
          </div>
        )}

        <section className="upload-section">
          <h2>Selecione opção de upload do perfil</h2>
          <div className="upload-options-temporario">
            <div
              className={`upload-option ${
                activeUploadMethod === "photo" ? "active" : ""
              }`}
              onClick={handleClickInvitePhoto}
            >
              <div className="upload-content">
                <img
                  src={
                    activeUploadMethod === "photo"
                      ? uploadedImage
                      : imagemSelecionarModelo
                  }
                  alt="Foto do aeromodelo"
                  className="upload-preview"
                />
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  <Camera size={20} />
                  Foto do aeromodelo
                </p>
              </div>
            </div>

            {/* <div
              className={`upload-option ${
                activeUploadMethod === "draw" ? "active" : ""
              }`}
              onClick={handleClickMakeDraw}
            >
              <div className="upload-content">
                <img
                  src={desenharPerfil}
                  alt="Desenhar perfil"
                  className="upload-preview"
                />
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  <Pencil size={20} />
                  Desenhar perfil
                </p>
              </div>
            </div> */}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </section>

        <section className="optimizer-section">
          <div className="optimizer-content">
            <div className="form-container">
              <h2>Otimizador de Perfil</h2>
              <form className="optimizer-form" onSubmit={handleSubmit}>
                <Slider
                  label="Envergadura"
                  name="envergadura"
                  value={formData.envergadura}
                  min={0.5}
                  max={20}
                  step={0.1}
                  unit="m"
                  required
                  onChange={handleSliderChange}
                  placeholder="Ex: 5.5"
                />

                <Slider
                  label="Corda média"
                  name="cordaMedia"
                  value={formData.cordaMedia}
                  min={0.1}
                  max={5}
                  step={0.01}
                  unit="m"
                  required
                  onChange={handleSliderChange}
                  placeholder="Ex: 1.2"
                />

                <Slider
                  label="Peso estimado"
                  name="pesoEstimado"
                  value={formData.pesoEstimado}
                  min={0.5}
                  max={100}
                  step={0.1}
                  unit="kg"
                  required
                  onChange={handleSliderChange}
                  placeholder="Ex: 10.5"
                />

                <Slider
                  label="Velocidade de Cruzeiro"
                  name="velocidadeCruzeiro"
                  value={formData.velocidadeCruzeiro}
                  min={5}
                  max={100}
                  step={0.5}
                  unit="m/s"
                  required
                  onChange={handleSliderChange}
                  placeholder="Ex: 15.5"
                />

                <Slider
                  label="Altitude"
                  name="altitude"
                  value={formData.altitude}
                  min={0}
                  max={1000}
                  step={1}
                  unit="m"
                  onChange={handleSliderChange}
                  placeholder="Ex: 100"
                />

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Enviar
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleReset}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            <div className="visualization-container">
              <AirplaneVisualization
                envergadura={formData.envergadura}
                cordaMedia={formData.cordaMedia}
                pesoEstimado={formData.pesoEstimado}
                velocidadeCruzeiro={formData.velocidadeCruzeiro}
              />
            </div>
          </div>
        </section>

        <footer className="forms-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p>Otimizador de Perfil de Asa</p>
              <p>Produzido por: Alunos da Universidades Tiradentes</p>
              <p>Grupo: Corvos Aerodesign</p>
            </div>
            <div className="footer-contact">
              <p>Dúvidas? Envie uma mensagem</p>
              <div className="contact-form">
                <input type="text" placeholder="Digite algo..." />
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Send size={16} />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FormsPage;
