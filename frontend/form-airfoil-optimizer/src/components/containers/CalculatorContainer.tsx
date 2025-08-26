import type { ConfigObject } from "../../types"
import "./CalculatorContainer.css"
import { useState } from "react"

interface CalculatorContainerProps {
    config: ConfigObject
    setConfig: React.Dispatch<React.SetStateAction<ConfigObject>>;
}

const CalculatorContainer = ({ config, setConfig }: CalculatorContainerProps) => {

    const [formData, setFormData] = useState({
        envergadura: "",
        cordaMedia: "",
        pesoEstimado: "",
        velocidadeCruzeiro: "",
        altitude: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.envergadura || !formData.cordaMedia || !formData.pesoEstimado || !formData.velocidadeCruzeiro) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        let uploadedFilename = null;

        // Passo 1: Enviar a imagem se ela existir
        if (config.img) {
            try {
                const imagePayload = {
                    img: config.img
                };
                const response = await fetch("http://127.0.0.1:8000/upload/imagem/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(imagePayload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Erro ao enviar a imagem.");
                }

                const result = await response.json();
                uploadedFilename = result.filename;
                console.log("Imagem enviada com sucesso:", uploadedFilename);

            } catch (error) {
                console.error("Erro na requisição de imagem: ", error);
                alert(`Erro ao enviar a imagem:`);
                //  ${error.message}
                return; // Impede o envio dos dados se a imagem falhar
            }
        }

        // Passo 2: Enviar os dados do formulário com o nome do arquivo da imagem
        const dataPayload = {
            img: uploadedFilename, // Inclui o nome do arquivo retornado
            envergadura: parseFloat(formData.envergadura),
            cordaMedia: parseFloat(formData.cordaMedia),
            pesoEstimado: parseFloat(formData.pesoEstimado),
            velocidadeCruzeiro: parseFloat(formData.velocidadeCruzeiro),
            altitude: parseFloat(formData.altitude) || 0
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/input/airfoil-data/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataPayload)
            });

            const result = await response.json();
            console.log("Resposta da API de dados: ", result);

            if (response.ok) {
                alert("Dados do aeromodelo enviados com sucesso!");

                // Limpa os campos do formulário após envio bem-sucedido
                setFormData({
                    envergadura: "",
                    cordaMedia: "",
                    pesoEstimado: "",
                    velocidadeCruzeiro: "",
                    altitude: "",
                });

                // setConfig(prevConfig => ({
                //     ...prevConfig,
                //     img: undefined,
                //     envergadura: 0,
                //     cordaMedia: 0,
                //     pesoEstimado: 0,
                //     velocidadeCruzeiro: 0,
                //     altitude: 0,
                // }));

            } else {
                alert("Erro ao enviar dados do aeromodelo: " + result.detail || "Erro desconhecido");
            }

        } catch (error) {
            console.error("Erro na requisição de dados: ", error);
            alert("Erro ao conectar com o servidor para enviar os dados.");
        }
    }

    const handleReset = () => {
        setFormData({
            envergadura: "",
            cordaMedia: "",
            pesoEstimado: "",
            velocidadeCruzeiro: "",
            altitude: "",
        });
        setConfig(prevConfig => ({
            ...prevConfig,
            img: undefined,
            envergadura: 0,
            cordaMedia: 0,
            pesoEstimado: 0,
            velocidadeCruzeiro: 0,
            altitude: 0,
        }))
    }

    return (
        <div className="container-calculator">
            <h2 className="title-calculate">Otimizador de Perfil</h2>

            <div className="display-container-calculator">
                <div className="container-form">
                    <form className="form-cal" onSubmit={handleSubmit}>
                        <label htmlFor="envergadura">Envergadura (m)*</label>
                        <input type="number" name="envergadura" id="envergadura" placeholder="Ex: 5m" required value={formData.envergadura} onChange={handleInputChange} />
                        <label htmlFor="cordaMedia">Corda média (m)*</label>
                        <input type="number" name="cordaMedia" id="cordaMedia" placeholder="Ex: 1m" required value={formData.cordaMedia} onChange={handleInputChange} />
                        <label htmlFor="pesoEstimado">Peso Estimado (kg)*</label>
                        <input type="number" name="pesoEstimado" id="pesoEstimado" placeholder="Ex: 10kg" required value={formData.pesoEstimado} onChange={handleInputChange} />
                        <label htmlFor="velocidadeCruzeiro">Velocidade Cruzeiro (m/s)*</label>
                        <input type="number" name="velocidadeCruzeiro" id="velocidadeCruzeiro" placeholder="Ex: 10m/s" required value={formData.velocidadeCruzeiro} onChange={handleInputChange} />
                        <label htmlFor="altitude">Altitude (m)</label>
                        <input type="number" name="altitude" id="altitude" placeholder="Ex: 20m" value={formData.altitude} onChange={handleInputChange} />
                        <div className="content-buttons">
                            <button type="submit" id="invite">Enviar</button>
                            <button type="reset" id="cancel" onClick={handleReset}>Cancelar</button>
                        </div>
                    </form>
                </div>
                <div className="container-image">
                    <img src="https://placehold.co/503x596" alt="Placeholder" className="img-select-input-airfol-2" />
                </div>
            </div>
        </div>
    )

}

export default CalculatorContainer