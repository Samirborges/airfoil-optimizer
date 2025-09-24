// CalculatorContainer.tsx
import type { ConfigObject } from "../../types";
import "./CalculatorContainer.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Adicione a importação para gerar IDs únicos

interface CalculatorContainerProps {
  config: ConfigObject;
  setConfig: React.Dispatch<React.SetStateAction<ConfigObject>>;
}

const CalculatorContainer = ({
  config,
  setConfig,
}: CalculatorContainerProps) => {
  const [formData, setFormData] = useState({
    envergadura: "",
    cordaMedia: "",
    pesoEstimado: "",
    velocidadeCruzeiro: "",
    altitude: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      envergadura: parseFloat(formData.envergadura),
      cordaMedia: parseFloat(formData.cordaMedia),
      pesoEstimado: parseFloat(formData.pesoEstimado),
      velocidadeCruzeiro: parseFloat(formData.velocidadeCruzeiro),
      altitude: parseFloat(formData.altitude) || 0,
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
      envergadura: "",
      cordaMedia: "",
      pesoEstimado: "",
      velocidadeCruzeiro: "",
      altitude: "",
    });
    setConfig((prevConfig) => ({
      ...prevConfig,
      envergadura: 0,
      cordaMedia: 0,
      pesoEstimado: 0,
      velocidadeCruzeiro: 0,
      altitude: 0,
    }));
  };

  return (
    <div className="container-calculator">
      <h2 className="title-calculate">Otimizador de Perfil</h2>
      <div className="display-container-calculator">
        <div className="container-form">
          <form className="form-cal" onSubmit={handleSubmit}>
            <label htmlFor="envergadura">Envergadura (m)*</label>
            <input
              type="number"
              name="envergadura"
              id="envergadura"
              placeholder="Ex: 5m"
              required
              value={formData.envergadura}
              onChange={handleInputChange}
            />
            <label htmlFor="cordaMedia">Corda média (m)*</label>
            <input
              type="number"
              name="cordaMedia"
              id="cordaMedia"
              placeholder="Ex: 1m"
              required
              value={formData.cordaMedia}
              onChange={handleInputChange}
            />
            <label htmlFor="pesoEstimado">Peso Estimado (kg)*</label>
            <input
              type="number"
              name="pesoEstimado"
              id="pesoEstimado"
              placeholder="Ex: 10kg"
              required
              value={formData.pesoEstimado}
              onChange={handleInputChange}
            />
            <label htmlFor="velocidadeCruzeiro">
              Velocidade Cruzeiro (m/s)*
            </label>
            <input
              type="number"
              name="velocidadeCruzeiro"
              id="velocidadeCruzeiro"
              placeholder="Ex: 10m/s"
              required
              value={formData.velocidadeCruzeiro}
              onChange={handleInputChange}
            />
            <label htmlFor="altitude">Altitude (m)</label>
            <input
              type="number"
              name="altitude"
              id="altitude"
              placeholder="Ex: 20m"
              value={formData.altitude}
              onChange={handleInputChange}
            />
            <div className="content-buttons">
              <button type="submit" id="invite">
                Enviar
              </button>
              <button type="reset" id="cancel" onClick={handleReset}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
        <div className="container-image">
          <img
            src="https://placehold.co/503x596"
            alt="Placeholder"
            className="img-select-input-airfol"
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorContainer;
