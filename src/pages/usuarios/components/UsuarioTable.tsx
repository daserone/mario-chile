import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
//Model
import { User } from "@src/models/user.model";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Service
import { getUser, getUsuarios } from "@services/usuario.service";

interface Params {
  state: string;
  search: string;
}

interface Props {
  handleToggle: (params: boolean) => void;
  params: Params;
  setSelection: (params: User | null) => void;
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
    queryFn: () => getUsuarios({ page, items: countPerPage, ...params }),
    placeholderData: keepPreviousData,
  });

  //Column
  const columns: TableColumn<User>[] = [
    {
      name: "USUARIO",
      selector: (row) => row.full_name,
    },
    {
      name: "CORREO",
      selector: (row) => row.email,
    },
    {
      name: "ROL",
      selector: (row) => row.is_admin,
      cell: (row) => (
        <div>
          {row.is_admin ? (
            <span className="active-badge">Admin</span>
          ) : (
            <span className="inactive-badge">Empleado</span>
          )}
        </div>
      ),
    },
    {
      name: "",
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
      data={data?.items ?? []}
      recordsTotals={data?.total_pages ?? 0}
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
