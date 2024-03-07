import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface integracionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}
const CardIntegracion = (props: { card: integracionCard }) => {
  const { card } = props;
  return (
    <div className="col">
      <div className="card-difusion">
        <div className="d-flex flex-row justify-content-between w-100">
          <div className="title">
            <img src={card.icon} alt="card-icon" />
            <h5 className="card-title">{card.title}</h5>
          </div>
        </div>
        <p className="card-description">{card.description}</p>
      </div>
    </div>
  );
};

export default CardIntegracion;
