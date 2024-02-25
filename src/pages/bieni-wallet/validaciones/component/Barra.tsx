import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
interface Props {
  texto: string;
  setTexto: (params: string) => void;
}
const Barra: React.FC<Props> = ({ texto, setTexto }) => {
  return (
    <>
      <div className="card-header-inputs">
        <div className="w-100 row mt-2">
          <div className="col-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar usuario..."
                value={texto}
                onChange={(e) => {
                  setTexto(e.target.value);
                }}
              />
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <div className="col-6 ms-auto">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Barra;
