import { useState, useMemo } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Viewer from "react-viewer";
//Config
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
//Style
import "./ImageSlider.scss";
//Assets
import iconPdf from "@src/assets/PDF.svg";

interface ImageItem {
  url: string;
  extension: string;
}

interface ImageSlidersProps {
  images: ImageItem[];
}

const RenderItem = ({ url, extension }: ImageItem) => {
  const extensiones = ["jpg", "png", "gif", "jpeg"];
  const isImage = extensiones.includes(extension.toLowerCase());

  return isImage ? (
    <img src={url} alt="" />
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={iconPdf}></img> Ver archivo
      </a>
    </div>
  );
};

const infoFile = (image: ImageItem[], key: number) => {
  const item = image[key] ?? { url: "", extension: "" };
  return {
    url: item.url,
    extension: item.extension,
  };
};

const ImageSliders = ({ images }: ImageSlidersProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [visible, setVisible] = useState(false);

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

  const currentImageLength = useMemo(() => images.length, [images]);

  const { url, extension } = infoFile(images, currentImageIndex);

  const adapterImages = useMemo(() => {
    return [{ src: url, alt: "" }];
  }, [url]);

  return (
    <>
      <div className="image-container">
        <div className="image">
          {currentImageLength === 0 ? (
            <div className="d-flex justify-content-center p-5">
              Sin imagenes
            </div>
          ) : (
            <div>
              <RenderItem url={url} extension={extension} />
            </div>
          )}
          {/* slide buttons  */}
          <div className="image-slides">
            <div
              className="image-slide-button ms-2"
              onClick={() => {
                setVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faMaximize} />
            </div>
            <div className="next-back">
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
      </div>
      {extension !== "pdf" ? (
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={adapterImages}
        />
      ) : null}
    </>
  );
};

export default ImageSliders;
