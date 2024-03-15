import fileIcon from "@assets/icons/upload.svg";

interface Props {
  label: string;
  handleClick: () => void;
  title?: string;
}
const FilesBox = ({ label, handleClick, title }: Props) => {
  return (
    <div className="dotted-file-box">
      <div className="dotted-file" onClick={handleClick}>
        <img src={fileIcon} alt="file" />
      </div>
      {title && <h3 className="text-center">{title}</h3>}
      <label className="dotted-file-text text-center">{label}</label>
    </div>
  );
};

export default FilesBox;
