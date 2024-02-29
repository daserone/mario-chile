import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { TableColumn } from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
//Hook
import { useDebounce } from "@src/hooks";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
import { Barra } from "../component";
//Service
import { getPacientesManuales } from "@services/paciente.service";
//Asset
import iconEmail from "@src/assets/icons/email-table.svg";
//Style
import "../Validaciones.scss";

import ImageSliders from "@src/component/buttons/images-slider/ImageSliders";
//import defaulImage from "@src/assets/images/defaul-validation.png";

interface DataRow {
  idusuario: string | number;
  idpaciente: string | number;
  iddocumento: string | number;
  document: string;
  documentType: string;
  name: string;
  age: string;
  birthdate: string;
  phone: string;
  profileType: string;
  verification: "verificacion-automatica" | "verificacion-manual";
  registrationDate: string;
  state: string;
  imageDocument: string;
  imageVerefication: string;
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
    ref
  ) => (
    <Button variant="danger" size="sm" onClick={onClick}>
      <FontAwesomeIcon icon={faThumbsDown} className="me-1" /> Denegar
      {children}
    </Button>
  )
);
const Manual = () => {
  //Hook
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selection, setSelection] = useState<DataRow | null>(null);
  const query = useDebounce(search, 2000);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes-manuales", page, query],
    queryFn: () => getPacientesManuales({ page, search: query }),
    placeholderData: keepPreviousData,
  });
  //Handle
  const handleApprove = () => {
    toast.error("Aprobar.");
    /*if (value.email === "") {
        toast.error("Agregue el correo.");
        return;
      }*/

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "dologinWithCredencial");
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="email-badge me-1  ">
            <img src={iconEmail} alt="email" className="" />
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

  /*
    const data: DataRow[] = [];
  {
      name: "Juan Perez",
      document: "123456789",
      age: "25",
      registrationDate: "2021-08-18",
      image: ["defaulImage", "secondImage"],
    },
    {
      name: "Maria Lopez",
      document: "987654321",
      age: "30",
      registrationDate: "2021-08-18",
      image: [],
    },
*/
  const [currentImageLength, setCurrentImageLength] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleSelect = (row: DataRow) => {
    setSelection(row);
    setCurrentImageLength(row.image.length);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (currentImageIndex + 1 < currentImageLength) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const handlePrevImage = () => {
    if (currentImageIndex - 1 >= 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

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
                handleSelect(data);
              }}
              handleDoubleClick={() => {}}
              isExpandable={false}
            />
          </Col>
          <Col
            xs={12}
            md={12}
            lg={4}
            className="border-start border-top ps-lg-0 "
          >
            <ImageSliders images={selection?.image ?? []} />
            {selection !== null ? (
              <div className="d-flex flex-row justify-content-around border-top py-2 w-100">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="success" className="ms-1" size="sm">
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

export default Manual;
