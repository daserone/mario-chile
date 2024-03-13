import fileIcon from "@assets/icons/upload.svg";

interface Props {
  label: string;
  handleClick: () => void;
}
const FilesBox = ({ label, handleClick }: Props) => {
  return (
    <div className="dotted-file-box">
      <div className="dotted-file" onClick={handleClick}>
        <img src={fileIcon} alt="file" />
      </div>
      <label className="dotted-file-text">{label}</label>
    </div>
  );
};

export default FilesBox;
