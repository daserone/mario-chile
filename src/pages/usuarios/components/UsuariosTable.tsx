import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
interface DataRow {
  user: string;
  email: string;
  status: boolean;
}

const UsuariosTable: React.FC = () => {
  const columns: TableColumn<DataRow>[] = [
    {
      name: "USUARIO",
      selector: (row) => row.user,
    },
    {
      name: "CORREO",
      selector: (row) => row.email,
    },
    {
      name: "ESTADO",
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          {row.status ? (
            <span className="active-badge">Activo</span>
          ) : (
            <span className="inactive-badge">Inactivo</span>
          )}
        </div>
      ),
    },
  ];
  const data: DataRow[] = [
    {
      user: "Juan",
      email: "juan@pruebas.com",
      status: true,
    },
  ];

  createTheme(
    "solarized",
    {
      text: {
        primary: "#4B465C",
        secondary: "#4B465C",
      },
      background: {
        default: "#f8f8f8",
      },

      divider: {
        default: "#DBDADE",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );
  const customStyles = {
    headCells: {
      style: {
        color: "#4B465C",
        fontWeight: "600",
      },
    },
  };
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      theme="solarized"
      customStyles={customStyles}
    />
  );
};

export default UsuariosTable;
