import { TableColumn } from "react-data-table-component";
import notificationIcon from "@src/assets/icons/notification-badge.svg";
import messageIcon from "@src/assets/icons/message-badge.svg";
import editIcon from "@src/assets/icons/edit.svg";
import { WrapperDataTable } from "@src/component/wrapper";
interface DataRow {
  title: string;
  state: "activo" | "inactivo";
  date: string;
  section: string;
  message: string;
}
const MensajesTable = () => {
  const columns: TableColumn<DataRow>[] = [
    {
      name: "TITULO",
      selector: (row) => row.title,
    },
    {
      name: "ESTADO",
      selector: (row) => row.state,
      cell: (row) => (
        <span
          className={`${
            row.state === "activo" ? "active-badge" : "inactive-badge"
          }`}
        >
          {row.state === "activo" ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      name: "FECHA",
      selector: (row) => row.date,
    },
    {
      name: "SECCION",
      selector: (row) => row.section,
    },
    {
      name: "MENSAJE",
      selector: (row) => row.message,
      cell: (row, rowIndex) => (
        <div className="first-row">
          <img
            src={rowIndex % 2 === 0 ? notificationIcon : messageIcon}
            alt="notification"
            className="me-1"
          />
          <span>{row.message}</span>
        </div>
      ),
    },
    {
      name: "",
      cell: () => (
        <div className="d-flex w-100 justify-content-end">
          <img
            src={editIcon}
            alt="edit"
            className=""
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const data: DataRow[] = [
    {
      title: "Titulo 1",
      state: "activo",
      date: "2021-08-01",
      section: "Sección 1",
      message: "Mensaje 1",
    },
    {
      title: "Titulo 2",
      state: "inactivo",
      date: "2021-08-02",
      section: "Sección 2",
      message: "Mensaje 2",
    },
    {
      title: "Titulo 3",
      state: "activo",
      date: "2021-08-03",
      section: "Sección 3",
      message: "Mensaje 3",
    },
  ];

  return (
    <WrapperDataTable
      title=""
      columns={columns}
      isLoading={false}
      isError={false}
      data={data ?? []}
      recordsTotals={data?.length ?? 0}
      countPerPage={10}
      setCountPerPage={() => {}}
      page={1}
      setPage={() => {}}
      handleClick={(item: DataRow) => {}}
      handleDoubleClick={(item: DataRow) => {}}
      isExpandable={false}
    />
  );
};

export default MensajesTable;
