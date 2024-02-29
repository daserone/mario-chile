import { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Style
import "./ImageSlider.scss";

interface ImageSlidersProps {
  images: string[];
}

const ImageSliders = ({ images }: ImageSlidersProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const currentImageLength = images.length;

  const handleNextImage = () => {
    if (currentImageIndex + 1 < currentImageLength) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const handlePrevImage = () => {
    if (currentImageIndex - 1 >= 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  return (
    <div className="image-container">
      <div className="image">
        {currentImageLength === 0 ? (
          <div className="d-flex justify-content-center p-5">Sin imagenes</div>
        ) : (
          <img src={images[currentImageIndex]}></img>
        )}
        {/* slide buttons  */}
        <div className="image-slides">
          <div
            className="image-slide-button"
            onClick={() => {
              handlePrevImage();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div
            className="image-slide-button"
            onClick={() => {
              handleNextImage();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSliders;
