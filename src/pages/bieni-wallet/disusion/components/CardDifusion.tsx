import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface difusionCard {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}
const CardDifusion = (props: { card: difusionCard }) => {
  const { card } = props;
  return (
    <div className="col">
      <div className="card-difusion">
        <div className="d-flex flex-row justify-content-between w-100">
          <div className="title">
            <h5 className="card-title">{card.title}</h5>
            <span
              className={`${card.isActive ? "active-badge" : "inactive-badge"}`}
            >
              {card.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <p className="card-description">{card.description}</p>
      </div>
    </div>
  );
};

export default CardDifusion;
