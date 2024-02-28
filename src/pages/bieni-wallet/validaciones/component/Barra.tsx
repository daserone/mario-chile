import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import ExportButton from "@src/component/buttons/ExportButton";
interface Props {
  texto: string;
  setTexto: (params: string) => void;
}
const Barra: React.FC<Props> = ({ texto, setTexto }) => {
  return (
    <>
      <div className="card-header-inputs w-100">
        <div className="px-2 py-1 mt-2 d-flex flex-row justify-content-between align-items-center">
          <div
            className="input-group"
            style={{
              width: "60%",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre, cédula o correo..."
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value);
              }}
            />

            {texto !== "" ? (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setTexto("");
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                type="button"
                disabled
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            )}
          </div>

          <ExportButton />
        </div>
      </div>
    </>
  );
};

export default Barra;
