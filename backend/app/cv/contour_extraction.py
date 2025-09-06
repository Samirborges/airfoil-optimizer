import cv2
import numpy as np

def extract_countur(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print(f"Erro! Não foi possível carregar a imagem no caminho: {image_path}")
        return None, None
    
    # Convertendo a imagem em tons de cinza
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    _, thresh_image = cv2.threshold(gray_image, 175, 255, cv2.THRESH_BINARY_INV)
    
    contours, _ = cv2.findContours(thresh_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour_image = image.copy()
    
    cv2.drawContours(contour_image, contours, -1, (0, 255, 0), 2) # Cor verde, espessura 2
    
    return image, contour_image

if __name__ == "__main__":
    image_path = "../../uploaded_images/perfil_de_asa.jpg"

    original, contours_drawn = extract_countur(image_path)
    if original is not None and contours_drawn is not None:
        # Exibir as imagens
        cv2.imshow("Imagem Original", original)
        cv2.imshow("Contornos Encontrados", contours_drawn)
        
        # Esperar uma tecla e fechar as janelas
        cv2.waitKey(0)
        cv2.destroyAllWindows()