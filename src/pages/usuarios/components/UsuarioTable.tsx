import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
//Model
import { UserDataRow } from "@src/models/user.model";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Service
import { getUsuarios } from "@services/usuario.service";

interface Params {
  state: string;
  search: string;
}

interface Props {
  handleToggle: (params: boolean) => void;
  params: Params;
  setSelection: (params: UserDataRow | null) => void;
}

const UsuariosTable: React.FC<Props> = ({
  params,
  setSelection,
  handleToggle,
}) => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["usuarios", page, params],
    queryFn: () => getUsuarios({ page, ...params }),
    placeholderData: keepPreviousData,
  });
  //Column
  const columns: TableColumn<UserDataRow>[] = [
    {
      name: "USUARIO",
      selector: (row) => row.name,
    },
    {
      name: "CORREO",
      selector: (row) => row.email,
    },
    {
      name: "ESTADO",
      selector: (row) => row.state,
      cell: (row) => (
        <div>
          {row.state === "activo" ? (
            <span className="active-badge">Activo</span>
          ) : (
            <span className="inactive-badge">Inactivo</span>
          )}
        </div>
      ),
    },
    {
      name: "ACCIÓN",
      cell: (row) => (
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="light"
            onClick={() => {
              console.log(row);
              setSelection(row);
              handleToggle(true);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button variant="light">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <WrapperDataTable
      title=""
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      data={data?.data ?? []}
      recordsTotals={data?.recordsTotals ?? 0}
      countPerPage={countPerPage}
      setCountPerPage={setCountPerPage}
      page={page}
      setPage={setPage}
      handleClick={() => {}}
      handleDoubleClick={() => {}}
      isExpandable={false}
    />
  );
};

export default UsuariosTable;
