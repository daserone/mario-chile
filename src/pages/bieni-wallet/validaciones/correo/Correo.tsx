import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
//Model
import { ResponseNotificacion } from "@src/models";
import { DataRowPacientes } from "@models/paciente.model";
//Component
import { WrapperDataTable } from "@component/wrapper";
import { Barra } from "../component";
//Service
import {
  getPacientesCorreos,
  postPacienteBieniMail,
} from "@src/services/paciente.service";
//Hook
import { useDebounce } from "@src/hooks";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";
import iconCheck from "@src/assets/icons/circle-check.svg";

interface DataRow extends DataRowPacientes {
  image: Array<string>;
  email: string;
  url: string;
}

interface Props {
  tab: string;
}

interface ResponseNotificacionExt extends ResponseNotificacion {
  rsp: string | number;
}
const Correo = ({ tab }: Props) => {
  //Hook
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const query = useDebounce(search, 2000);
  //Solicitud
  const queryClient = useQueryClient();

  const pacienteMutation = useMutation({
    mutationFn: postPacienteBieniMail,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes-correos", page, query],
    queryFn: () => getPacientesCorreos({ page, search: query }),
    placeholderData: keepPreviousData,
    enabled: tab === "correo",
    refetchOnWindowFocus: false,
  });

  const handleSendEmail = (correo: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "enviarLink");
    form.append("correo", correo);
    pacienteMutation.mutate(form, {
      onSuccess: (rsp) => {
        const { data, status } = rsp;
        if (status >= 200 && status < 300) {
          const { rsp: responseCode }: ResponseNotificacionExt = data;
          if (responseCode === 1) {
            toast.success("Correo enviado.");
            queryClient.invalidateQueries({
              queryKey: ["pacientes-correos", page, query],
            });
          }
        }
      },
      onError: () => {
        toast.error("Error al enviar correo.");
      },
    });
  };

  const handleMailClick = (correo: string) => {
    window.location.href = `mailto:${correo}?subject=Bieni`;
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "CORREO",
      selector: (row) => row.email,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="email-badge me-1  ">
            <img
              src={iconEmail}
              alt="email"
              className=""
              onClick={() => {
                handleMailClick(row.email);
              }}
            />
          </div>
          {row.email}
        </div>
      ),
    },
    {
      name: "DIRECCIÓN",
      selector: (row) => row.url,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div>{row.url}</div>
          <div className="email-badge me-1">
            <img src={iconCheck} alt="email" className="" />
          </div>
        </div>
      ),
    },
    {
      name: "",
      selector: (row) => row.email,
      cell: (row) => (
        <Button
          variant="link"
          onClick={() => {
            handleSendEmail(row.email);
          }}
        >
          Reenviar enlace
        </Button>
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
          <Col xs={12} md={12} lg={12}>
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
              handleClick={() => {}}
              handleDoubleClick={() => {}}
              isExpandable={false}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Correo;
