import { useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
//Model
//import { ResponseNotificacion } from "@src/models";
import { DataRowPacientes } from "@models/paciente.model";
//Component
import { WrapperDataTable } from "@component/wrapper";
import Barra from "../../Barra";
//Service
import {
  getPacientesDocumentos,
  postPacienteBieni,
} from "@src/services/paciente.service";
//Hook
import { useDebounce } from "@src/hooks";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";

interface DataRow extends DataRowPacientes {
  image: Array<string>;
  email: string;
  url: string;
  family: string;
}

interface Props {
  tab: string;
}

const TabDocumentosAdicionales = ({ tab }: Props) => {
  //Hook
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selection, setSelection] = useState<DataRow | null>(null);
  const query = useDebounce(search, 2000);
  //Solicitud
  //const queryClient = useQueryClient();

  const pacienteMutation = useMutation({
    mutationFn: postPacienteBieni,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes-documentos", page, query],
    queryFn: () => getPacientesDocumentos({ page, search: query }),
    placeholderData: keepPreviousData,
    enabled: tab === "documento",
    refetchOnWindowFocus: false,
  });

  const handleMailClick = (correo: string) => {
    window.location.href = `mailto:${correo}?subject=Bieni`;
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      cell: (row) => (
        <div
          className="d-flex align-items-center"
          style={{
            borderLeft: `${
              selection?.idpaciente === row.idpaciente
                ? "4px solid #9087f1"
                : ""
            }`,
          }}
        >
          <div className="email-badge me-1  ">
            {selection?.idpaciente === row.idpaciente &&
            pacienteMutation.isPending ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <img
                src={iconEmail}
                alt="email"
                className=""
                onClick={() => {
                  handleMailClick(row.email);
                }}
              />
            )}
          </div>
          <div className="d-flex flex-column">
            <div>{row.name}</div>
          </div>
        </div>
      ),
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.document,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.document}
          <span className="text-muted">{row.documentType}</span>
        </div>
      ),
    },
    {
      name: "EDAD",
      selector: (row) => row.age,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.age}
          <span className="text-muted">{row.birthdate}</span>
        </div>
      ),
    },
    {
      name: "REGISTRO",
      selector: (row) => row.registrationDate,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.registrationDate}
          <span className="text-muted"></span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <Barra texto={search} setTexto={setSearch} />
      </div>
      <div className="">
        <Row>
          <Col xs={12} md={12} lg={8}>
            {" "}
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
              handleClick={(data) => {
                setSelection(data);
              }}
              handleDoubleClick={() => {}}
              isExpandable={false}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TabDocumentosAdicionales;
