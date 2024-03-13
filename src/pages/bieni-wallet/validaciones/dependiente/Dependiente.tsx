import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import { TableColumn } from "react-data-table-component";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
import { Barra } from "../component";
import ImageSliders from "@src/component/buttons/images-slider/ImageSliders";
//Model
import { ResponseNotificacion } from "@src/models";
//Models
import { DataRowPacientes } from "@models/paciente.model";
//Service
import {
  getPacientesDependientes,
  postPaciente,
} from "@services/paciente.service";
//Helpers
import { dropdownDependiente } from "../helpers/data";
//Hook
import { useDebounce } from "@src/hooks";
//Style
import "../Validaciones.scss";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg"; //Config
const MySwal = withReactContent(Swal);

interface DataRow extends DataRowPacientes {
  relationship: string;
  idfamiliar: string | number;
  image: Array<string>;
}

const CustomToggle = React.forwardRef(
  (
    {
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: React.MouseEventHandler<HTMLButtonElement>;
    },
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <Button variant="danger" size="sm" onClick={onClick} ref={ref}>
      <FontAwesomeIcon icon={faThumbsDown} className="me-1" /> Denegar
      {children}
    </Button>
  )
);

interface Props {
  tab: string;
}

const Dependiente = ({ tab }: Props) => {
  //Hook
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selection, setSelection] = useState<DataRow | null>(null);

  const query = useDebounce(search, 2000);
  //Solicitud
  const queryClient = useQueryClient();

  const pacienteMutation = useMutation({
    mutationFn: postPaciente,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes-dependientes", page, query],
    queryFn: () => getPacientesDependientes({ page, search: query }),
    placeholderData: keepPreviousData,
    enabled: tab === "dependiente",
    refetchOnWindowFocus: false,
  });
  //Handle
  const handleApprove = () => {
    if (selection === null) {
      toast.error("Seleccione un registro");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "dependiente/aprobar");
    form.append("idusuario", selection.idusuario);
    form.append("idpaciente", selection.idpaciente);
    form.append("iddocumento", selection.iddocumento);
    form.append("idfamiliar", selection.idfamiliar);

    pacienteMutation.mutate(form, {
      onSuccess: (rsp) => {
        const { data, status } = rsp;
        if (status >= 200 && status < 300) {
          const { responseCode }: ResponseNotificacion = data;
          if (responseCode === 1) {
            toast.success("Dependiente aprobado.");
            queryClient.invalidateQueries({
              queryKey: ["pacientes-dependientes", page, query],
            });
            setSelection(null);
          }
        }
      },
      onError: () => {
        toast.error("Error al aprobar principal.");
        setSelection(null);
      },
    });
  };

  const decline = (value: string) => {
    if (selection === null) {
      toast.error("Seleccione un registro");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "dependiente/rechazar");
    form.append("idusuario", selection.idusuario);
    form.append("idpaciente", selection.idpaciente);
    form.append("iddocumento", selection.iddocumento);
    form.append("idfamiliar", selection.idfamiliar);
    form.append("idoption", value);
    pacienteMutation.mutate(form, {
      onSuccess: (rsp) => {
        const { data, status } = rsp;
        if (status >= 200 && status < 300) {
          const { responseCode }: ResponseNotificacion = data;
          if (responseCode === 1) {
            toast.success("Dependiente rechazado.");
            queryClient.invalidateQueries({
              queryKey: ["pacientes-dependientes", page, query],
            });
            setSelection(null);
          }
        }
      },
      onError: () => {
        toast.error("Error al aprobar principal.");
        setSelection(null);
      },
    });
  };

  const handlePrevDecline = async (value: string) => {
    const result = await MySwal.fire({
      title: "Rechazar paciente",
      html: "Esta seguro de rechazar",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-secondary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      didClose: () => window.scrollTo(0, 0),
      buttonsStyling: false,
    });
    if (result.value) {
      decline(value);
    }
  };

  const handleMailClick = (correo: string) => {
    window.location.href = `mailto:${correo}?subject=Bieni`;
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "PRINCIPAL",
      selector: (row) => row.document,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.document}
          <span className="text-muted">{row.documentType}</span>
        </div>
      ),
    },
    {
      name: "DEPENDIENTE",
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
          {row.name}
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
  //const data: DataRow[] = [];
  console.log(selection);
  //console.log(selection !== null && selection?.image.length);

  console.log(selection?.image);
  return (
    <>
      <div className="px-2 border-bottom ">
        <h3>Filtro</h3>
      </div>
      <Row>
        <Col xs={12}>
          <Barra texto={search} setTexto={setSearch} />
        </Col>
      </Row>
      <div className="">
        <Row>
          <Col xs={12} md={12} lg={8} className="border-top">
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
          <Col
            xs={12}
            md={12}
            lg={4}
            className="border-start border-top ps-lg-0"
          >
            <ImageSliders images={selection?.image ?? []} />
            {selection !== null && selection?.image.length > 0 ? (
              <div className="d-flex flex-row justify-content-around border-top py-2 w-100">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu>
                    {dropdownDependiente.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          handlePrevDecline(item.value);
                        }}
                      >
                        {item.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="success"
                  className="ms-1"
                  size="sm"
                  onClick={handleApprove}
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
                  Aprobar
                </Button>
              </div>
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dependiente;
