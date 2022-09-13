import { IonImg } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Boxfull: React.FC<{
  title: string;
  imageTitle: string;
  iconTop: any;
  fechaTop: string;
  horaTop: string;
  yearTop: string;
  iconTextoUno: any;
  textoUno: string;
  iconTextoDos: any;
  textoDos: string;
  iconTextoTres: any;
  textoTres: string;
  iconTextoCuatro: any;
  textoCuatro: string;
  linkBottomLeft: string;
  linkBottomRight: string;
  textLinkBottomLeft: string;
  textLinkBottomRight: string;
  ir: boolean;
  linkIr: string;
  tipo: string;
  textoUrlExternaLeft?: string;
  urlExternaLeft?: string;
}> = ({
  title,
  imageTitle,
  iconTop,
  fechaTop,
  horaTop,
  yearTop,
  iconTextoUno,
  textoUno,
  iconTextoDos,
  textoDos,
  iconTextoTres,
  textoTres,
  iconTextoCuatro,
  textoCuatro,
  linkBottomLeft,
  linkBottomRight,
  textLinkBottomLeft,
  textLinkBottomRight,
  ir,
  linkIr,
  tipo,
  textoUrlExternaLeft,
  urlExternaLeft,
}) => {
  const history = useHistory();
  const handelClick = () => {
    //history.push("/app/afiliados");
  };
  const linkExterno = (url?: string) => {
    window.open(`${url}`, "_blank");
  };
  return (
    <>
      <div
        className="slide-full"
        onClick={() => {
          handelClick();
        }}
      >
        {imageTitle !== "" && (
          <IonImg
            src={imageTitle}
            style={{ width: "50px" }}
            className="float-left mr-2"
          />
        )}

        {fechaTop !== "" && (
          <p className="mr-0 float-right">
            {fechaTop !== "" && (
              <span className="mr-0 w-100 float-right text-right fs-22 font-w600 text-info">
                {fechaTop}
              </span>
            )}

            {horaTop !== "" && (
              <span className="mr-0 box-blue-light-alt fs-16 float-right text-right">
                {horaTop}
              </span>
            )}

            {yearTop !== "" && (
              <span className="mr-0 float-right text-right fs-12">
                {yearTop}
              </span>
            )}
          </p>
        )}

        <div
          className={
            imageTitle !== ""
              ? `fs-16 font-w600 text-info mt-2 mb-2`
              : `fs-16 font-w600 text-info mb-2`
          }
        >
          {title}

          {iconTop !== "" && (
            <FontAwesomeIcon icon={iconTop} className="mr-0 float-right" />
          )}
        </div>
        <div>
          <p className="mb-0 mt-1 fs-12 d-flex">
            {iconTextoUno !== "" && (
              <IonImg src={`images/${iconTextoUno}.svg`} className="icon-box-details mr-2" />
            )}
            <span className="mr-2">{textoUno}</span>
          </p>
        </div>

        {textoDos !== "" && (
          <div>
            <p className="mb-0 mt-2 fs-12 d-flex">
              {iconTextoDos !== "" && (
                <IonImg src={`images/${iconTextoDos}.svg`} className="icon-box-details mr-2" />
              )}
              <span className="mr-2">{textoDos}</span>
            </p>
          </div>
        )}

        {textoTres !== "" && (
          <div>
            <p className="mb-0 mt-2 fs-12 d-flex">
              {iconTextoTres !== "" && (
                <IonImg src={`images/${iconTextoTres}.svg`} className="icon-box-details mr-2" />
              )}
              <span className="mr-2">{textoTres}</span>
            </p>
          </div>
        )}

        {textoCuatro !== "" && (
          <div>
            <p className="mb-0 mt-2 fs-12 d-flex">
              {iconTextoCuatro !== "" && (
                <IonImg src={`images/${iconTextoCuatro}.svg`} className="icon-box-details mr-2" />
              )}
              <span className="mr-2">{textoCuatro}</span>
            </p>
          </div>
        )}

        {textLinkBottomLeft !== "" && (
          <div>
            <p className="mb-0 mt-3 fs-12 float-left">
              <Link to={linkBottomLeft} className="text-info-light underline">
                {textLinkBottomLeft}
              </Link>
            </p>
          </div>
        )}

        {textLinkBottomRight !== "" && (
          <div>
            <p className="mb-0 mt-3 fs-12 float-right">
              <Link to={linkBottomRight} className="text-info-light underline">
                {textLinkBottomRight}
              </Link>
            </p>
          </div>
        )}

        {ir && (
          <div className="mr-0 float-right" style={{ marginTop: "-10px" }}>
            <Link to={linkIr}>
              <FontAwesomeIcon icon={faAngleRight} className="text-info-dark" />
            </Link>
          </div>
        )}

        {textoUrlExternaLeft !== "" && (
          <div>
            <p className="mb-0 mt-3 fs-12 float-left">
              <Link
                to="#"
                onClick={() => {
                  linkExterno(urlExternaLeft);
                }}
                className="text-info-light"
                style={{ textDecoration: "underline" }}
              >
                {textoUrlExternaLeft}
              </Link>
            </p>
          </div>
        )}

        {tipo && (
          <p className="mb-0 fs-12 float-right text-info-light">{tipo}</p>
        )}
      </div>
    </>
  );
};
export default Boxfull;
