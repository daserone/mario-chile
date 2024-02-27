import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddButtonProps {
  title: string;
  handleClick: () => void;
}

const AddButton = ({ title, handleClick }: AddButtonProps) => {
  return (
    <button className="btn btn-primary" type="button" onClick={handleClick}>
      <FontAwesomeIcon icon={faPlus} className="me-2" />
      {title}
    </button>
  );
};

export default AddButton;
