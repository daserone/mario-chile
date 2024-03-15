import { faMaximize, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FileItemProps {
  file: File;
  handleRemove: (file: File) => void;
  handleExpand: (file: File) => void;
}
const FileItem = ({ file, handleRemove, handleExpand }: FileItemProps) => {
  return (
    <div className="file-item">
      <FontAwesomeIcon icon={faMaximize} className="me-1 text-muted icon" />
      {file.name}
      <FontAwesomeIcon
        icon={faTrash}
        className="ms-1 text-danger icon"
        onClick={() => handleRemove(file)}
      />
    </div>
  );
};

export default FileItem;
