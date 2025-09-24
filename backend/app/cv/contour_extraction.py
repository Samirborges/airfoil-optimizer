import cv2
import numpy as np

def extract_countur(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print(f"Erro! Não foi possível carregar a imagem no caminho: {image_path}")
        return None, None, None
    
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh_image = cv2.threshold(gray_image, 175, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    contour_image = image.copy()
    cv2.drawContours(contour_image, contours, -1, (0, 255, 0), 2)
    
    normalized_contour = None
    if contours:
        # Acha o contorno com maior área
        main_contour = max(contours, key=cv2.contourArea)
        # Normaliza o contorno para o sistema de coordenadas de 0 a 1
        x, y, w, h = cv2.boundingRect(main_contour)
        normalized_contour = []
        for point in main_contour:
            px, py = point[0]
            normalized_x = (px - x) / w
            normalized_y = (py - y) / h
            normalized_contour.append([normalized_x, normalized_y])
    
    return image, contour_image, normalized_contour

if __name__ == "__main__":
    image_path = "../../uploaded_images/perfil_de_asa.jpg"

    original, contours_drawn, normalized_contour = extract_countur(image_path)
    if original is not None and contours_drawn is not None:
        cv2.imshow("Imagem Original", original)
        cv2.imshow("Contornos Encontrados", contours_drawn)
        
        if normalized_contour is not None:
            print("Contorno normalizado:", normalized_contour)
        
        cv2.waitKey(0)
        cv2.destroyAllWindows()